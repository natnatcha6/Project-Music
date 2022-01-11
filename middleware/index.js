var Artist  = require('../models/artist');

var middlewareObj = {};

// middlewareObj.checkMusicOwner = function(req, res, next){
//     if(req.isAuthenticated()){
//         Music.findById(req.params.id, function(err, foundMusic){
//             if(err){
//                 req.flash('error', 'Music not found!');
//                 res.redirect('back');
//             } else {
//                 if(foundMusic.author.id.equals(req.user._id)) {
//                     next();
//                 } else {
//                     // req.flash('error', 'You do not have permission to do this action.');
//                     res.redirect('back');
//                 }
//             }
//         });
//     } else {
//         // req.flash('error', 'You need to sign in first!');
//         res.redirect('back');
//     }
// }



middlewareObj.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    // req.flash('error', 'You need to sign in first!');
    res.redirect('/login');
}

module.exports = middlewareObj;