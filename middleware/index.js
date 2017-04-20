var Adventure = require('../models/adventure'),
    Comment = require('../models/comment');

//All Middleware
var middlewareObj = {};

middlewareObj.checkAdventureOwnership = function(req, res, next) {
    if (req.isAuthenticated()) {
        Adventure.findById(req.params.id, function(err, foundAdventure){
            if(err){
                req.flash('error', 'Adventure not found');
                res.redirect('back')
            } else {
                // does user own the adventure?
                // .equals is given to us by mongoose
                if(foundAdventure.author.id.equals(req.user._id)) {
                    next();
                } else {
                    req.flash('error', "You don't have permission to do that");
                    res.redirect('back');
                }
            }
        });
    } else {
        req.flash('error', 'You need to be logged in to do that');
        res.redirect('back');
    }
}

middlewareObj.checkCommentOwnership = function(req, res, next) {
    if (req.isAuthenticated()) {
        Comment.findById(req.params.comment_id, function(err, foundComment){
            if(err){
                res.redirect('back')
            } else {
                // does user own the comment?
                // .equals is given to us by mongoose
                if(foundComment.author.id.equals(req.user._id)) {
                    next();
                } else {
                    req.flash('error', "You don't have permission to do that");
                    res.redirect('back');
                }
            }
        });
    } else {
        req.flash('error', 'You need to be logged in to do that');
        res.redirect('back');
    }
}

middlewareObj.isLoggedIn = function(req, res, next) {
    if(req.isAuthenticated()){
        return next();
    }
    req.flash('error', 'You need to be logged in to do that');
    res.redirect('/login');
}

module.exports = middlewareObj