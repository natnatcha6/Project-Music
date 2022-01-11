var express     = require('express'),
    router      = express.Router(),
    User        = require('../models/user'),
    Artist      = require('../models/artist'),
    Music       = require('../models/music'),
    passport    = require('passport');



// router.get('/payment', isLoggedIn, function(req, res){
//     res.render('payment.ejs');
// });

// router.get('/melody', isLoggedIn, function(req, res){
//     res.render('melody.ejs');
// });

router.get('/logout', function(req, res){
    req.logout();
    res.redirect('/');
})

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    } else {
        res.redirect('/login');
    }
}
module.exports = router;