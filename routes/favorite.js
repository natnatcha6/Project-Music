var express     = require('express'),
    router      = express.Router(),
    User        = require('../models/user'),
    Favorite    = require('../models/favorite'),
    Artist      = require('../models/artist'),
    Music       = require('../models/music'),
    passport    = require('passport');

//เพิ่ม favorite
router.get("/:id", function (req, res) {
    Favorite.find({ username: req.params.id }, function (err, allFavorite) {
        if (err) {
            console.log(err);
        } else {
            // console.log(allFavorite[0].music.id);
            res.render("favorite.ejs", { favorite: allFavorite });
        }
    });
});

//ลบ faverite
router.delete("/:id", function (req, res) {
    Favorite.findByIdAndRemove(req.params.id, function (err) {
        if (err) {
            console.log(err);
            res.redirect("/favorite/");
        } else {
            res.redirect("/favorite/" + req.user.username);
        }
    });
});

module.exports = router;