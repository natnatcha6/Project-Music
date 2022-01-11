var express = require('express'),
    router = express.Router(),
    User = require('../models/user'),
    Contact = require('../models/contact'),
    passport = require('passport');
    storage = multer.diskStorage({
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
    upload = multer({ storage: storage }),
    Music = require('../models/music');
    Artist = require('../models/artist');

//โชว์หน้าเพลงadmin
router.get('/adminMusic', function (req, res) {
    Music.find({}, function (err, allMusic) {
        if (err) {
            console.log(err);
        } else {
            res.render('adminMusic.ejs', { music: allMusic });
        }
    });
});

router.post('/adminMusic', upload.fields([{ name: 'image', maxCount: 1 }, { name: 'audio', maxCount: 1 }]), function (req, res) {
    req.body.music.image = '/uploads/' + req.files.image[0].filename;
    req.body.music.audio = '/uploads/' + req.files.audio[0].filename;

    Music.create(req.body.music, function (err, newSong) {
        if (err) {
            console.log(err);
        } else {
            console.log(newSong);
            res.redirect('/admin/adminMusic');
        }
    });
});


//ไปหน้าที่เพิ่มศิลปิน
router.get('/addArt', function (req, res) {
    res.render('addArt.ejs');
});

router.post('/addArt', function (req, res) {
    Artist.create(req.body.artist, function (err, newlyCreated) {
        if (err) {
            console.log(err);
        } else {
            res.redirect('/artist');
        }
    });
});



//ลบเพลง
router.delete('/adminMusic/:id', function (req, res) {
    Music.findByIdAndRemove(req.params.id, function (err) {
        if (err) {
            // console.log(err);
            res.redirect('/admin/adminMusic');
        } else {
            res.redirect('/admin/adminMusic');
        }
    });
});


//ไปหน้าที่เพิ่มเพลง
router.get('/addMu', function (req, res) {
    res.render('addMu.ejs');
});


//ไปหน้าแก้ไขของเพลงแต่ละเพลง
router.get('/adminMusic/:id/editMusic', function (req, res) {
    Music.findById(req.params.id, function (err, foundMusic) {
        if (err) {
            console.log(err);
        } else {
            res.render('editMusic.ejs', { music: foundMusic })
        }
    });
});

//ติดไว้ก่อนนะอีสัดดดด
// router.put('/adminMusic/:id', upload.single('image'), upload.single('audio'), function (req, res) {
//     if (req.file) {
//         req.body.music.image = '/uploads/' + req.file.filename;
//         req.body.music.audio = '/uploads/' + req.file.filename;
//     }
//     Music.findByIdAndUpdate(req.params.id, req.body.artist, function (err, updatedMusic) {
//         if (err) {
//             console.log("error")
//             res.redirect('/adminMusic');
//         } else {
//             console.log("success")
//             res.redirect('/adminMusic');
//         }
//     });
// });

//แก้ของแต่ละเพลง
router.put('/adminMusic/:id', upload.single('image'), function (req, res) {
    if (req.file) {
        req.body.music.image = '/uploads/' + req.file.filename;
    }
    Music.findByIdAndUpdate(req.params.id, req.body.music, function (err, updatedMusic) {
        if (err) {
            res.redirect('/artist');
        } else {
            res.redirect('/artist');
        }
    });
});

//ไปหน้าmember
router.get('/member', function (req, res) {
    User.find({}, function (err, allUser) {
        if (err) {
            console.log(err);
        } else {
            res.render('member.ejs', { user: allUser });
        }
    });
});


//ลบ member
router.delete('/member/:id', function (req, res) {
    User.findByIdAndRemove(req.params.id, function (err) {
        if (err) {
            // console.log(err);
            res.redirect('/admin/member');
        } else {
            res.redirect('/admin/member');
        }
    });
});

//ไปหน้า message
router.get('/message', function (req, res) {
    Contact.find({}, function (err, allContact) {
        if (err) {
            console.log(err);
        } else {
            res.render('message.ejs', { contact: allContact });
        }
    });
});



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