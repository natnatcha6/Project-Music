var express     = require('express'),
    router      = express.Router(),
    Slide       = require('../models/slide'),
    middleware  = require('../middleware'),
    Contact     = require('../models/contact'),
    passport    = require('passport');
    path        = require('path'),
    multer      = require('multer'),
    storage     = multer.diskStorage({
        destination: function (req, file, callback) {
            callback(null, './public/uploads/');
        },
        filename: function (req, file, callback) {
            callback(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
        }
    }),

    imageFilter = function (req, file, callback) {
        if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/i)) {
            return callback(new Error('Only JPG, jpeg, PNGm and GIF image files are allowed!'), false);
        }
        callback(null, true);
    },
    upload      = multer({ storage: storage, fileFilter: imageFilter }),
    User        = require('../models/user');

//สไลด์
router.get('/', function (req, res) {
    Slide.find({}, function (err, allSlide) {
        if (err) {
            console.log(err);
        } else {
            Music.find({}, function (err, allmusic) {

                if (err) {
                    console.log(err);
                } else {
                    res.render('home.ejs', { music: allmusic, slide: allSlide });
                }
            });

        }
    });

});

//ค้นหา
router.post('/', function (req, res) {
    var word = req.body.search;
    if (word != "") {
        Music.find({ $or: [{ name: { $regex: word, $options: 'i' } }, { music: { $regex: word, $options: 'i' } }] }).sort({ date: 1 }).exec(function (err, foundMusic) {
            // Music.find({ name: word }, function (err, foundMusic) {
            if (err) {
                // req.flash('error', err.message);
                console.log(err);
            } else {
                console.log(word);
                res.render('search.ejs', { music: foundMusic,  word: word });

            }
        });
    } else {
        Music.find({ name: word }, function (err, foundMusic) {

            res.render('search.ejs', { music: foundMusic, word: word });
        });

    }
});


//ล็อกอิน
router.get('/login', function (req, res) {
    res.render('login.ejs');
});

router.post('/login', passport.authenticate('local',
    {
        successRedirect: '/',
        failureRedirect: '/login'
    }), function (req, res) {
    });

//สมัคร
router.get('/register', function (req, res) {
    res.render('register.ejs');
});

router.post('/register', upload.single('image'), function (req, res) {
    req.body.image = '/uploads/' + req.file.filename;
    var newUser = new User({
        username: req.body.username,
        email: req.body.email,
        image: req.body.image
    });
    User.register(newUser, req.body.password, function (err, user) {
        if (err) {
            // req.flash('error', err.message);
            return res.redirect('/register');
        }
        passport.authenticate('local')(req, res, function () {
            // req.flash('success', 'Welcome to CINETHEARTER ' + user.username);
            res.redirect('/');
        });
    });
});

//ไปหน้าติดต่อ
router.get('/contact', function (req, res) {
    res.render('contact.ejs');
});

router.post('/index/contact', function (req, res) {
    Contact.create(req.body.contact, function (err, newlyCreated) {
        if (err) {
            req.flash(' message sent successfully');
            console.log(err);
        } else {
            res.redirect('/contact');
        }
    });
});

//ไปหน้าแก้ไขโปรไฟล์
// router.get('/profile', function (req, res) {
//     User.findById(req.params.id, function (err, foundUser) {
//         if (err) {
//             console.log(err);
//         } else {
//             res.render('profile.ejs', { user: foundUser })
//         }
//     });
// });

// router.put('/:id', upload.single('image'), function (req, res) {
//     if (req.file) {
//         req.body.user.image = '/uploads/' + req.file.filename;
//     }
//     User.findByIdAndUpdate(req.params.id, req.body.artist, function (err, updatedUser) {
//         if (err) {
//             res.redirect('/profile/');
//         } else {
//             res.redirect('/profile/');
//         }
//     });
// });

router.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/');
})

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    } else {
        res.redirect('/login');
    }
}

module.exports = router;