const { findOne } = require('../models/music');
const music = require('../models/music');
const Favorite = require('../models/favorite');

var express     = require('express'),
    router      = express.Router(),
    User        = require('../models/user'),
    multer      = require('multer'),
    passport    = require('passport'),
    path        = require('path'),
    middleware  = require('../middleware'),
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
    upload = multer({ storage: storage, fileFilter: imageFilter }),
    Artist = require('../models/artist');

//อัปศิลปิน
router.get('/', function (req, res) {
    Artist.find({}, function (err, allArtist) {
        if (err) {
            console.log(err);
        } else {
            res.render('artist.ejs', { artist: allArtist });
        }
    });
});

//แสดงเนื้อเพลง
router.get('/melody/:music', middleware.isLoggedIn,function (req, res) {
    Music.findOne({ music: req.params.music }, function (err, music) {
        if (err) {
            console.log(err);
        } else {
            console.log(music)
            res.render('melody.ejs', { music: music });
        }
    });
});

router.post('/', upload.single('image'), function (req, res) {
    req.body.artist.image = '/uploads/' + req.file.filename;

    Artist.create(req.body.artist, function (err, newlyCreated) {
        if (err) {
            console.log(err);
        } else {
            console.log('new data add');
            res.redirect('/artist');
        }
    });
});

//ไปหน้าเพลงของแต่ละศิลปิน
router.get('/:id', function (req, res) {
    Music.find({ name: req.params.id }, function (err, foundMusic) {
        Artist.findOne({ name: req.params.id }, function (err, artist) {

            if (err) {
                console.log(err);
            } else {
                // Music.findOne({name:req.params.name})
                res.render('music.ejs', { music: foundMusic, artist: artist })
            }

        });
    });
});

//ไปหน้าแก้ไขของแต่ละอันของศิลปิน
router.get('/:id/edit', function (req, res) {
    Artist.findById(req.params.id, function (err, foundArtist) {
        if (err) {
            console.log(err);
        } else {
            res.render('edit.ejs', { artist: foundArtist })
        }
    });
});

router.put('/:id', upload.single('image'), function (req, res) {
    if (req.file) {
        req.body.artist.image = '/uploads/' + req.file.filename;
    }
    Artist.findByIdAndUpdate(req.params.id, req.body.artist, function (err, updatedArtist) {
        if (err) {
            res.redirect('/artist/');
        } else {
            res.redirect('/artist/');
        }
    });
});

//ลบข้อมูลในศิลปิน
router.delete('/:id', function (req, res) {
    Artist.findByIdAndRemove(req.params.id, function (err) {
        if (err) {
            // console.log(err);
            res.redirect('/artist/');
        } else {
            res.redirect('/artist/');
        }
    });
});

//ไปรายการโปรด
router.post("/:id", function (req, res) {
    console.log(req.body.fav);
    Favorite.create(req.body.fav, function (err, newlyCreated) {
      if (err) {
        console.log(err);
      } else {
        console.log(newlyCreated);
        res.redirect("/artist/" + req.params.id);
      }
    });
});



router.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/');
})


// function isLoggedIn(req, res, next) {
//     if (req.isAuthenticated()) {
//         return next();
//     } else {
//         res.redirect('/login');
//     }
// }

module.exports = router;