var express = require('express'),
    router = express.Router({mergeParams: true}),
    Adventure = require('../models/adventure.js'),
    Comment = require('../models/comment.js');

//Comments New
router.get('/new', isLoggedIn, function(req, res) {
    //find adventure by id
    Adventure.findById(req.params.id, function(err, adventure){
        if(err){
            console.log(err);
        } else {
            res.render('comments/new',{adventure: adventure});
        }
    })
});

//Comments Create
router.post('/', isLoggedIn, function(req, res){
    //look up adventures using ID
    //create new comment
    //connect new comment to new adventures
    //redirect to adventure show page
    Adventure.findById(req.params.id, function(err, adventure) {
        if (err) {
            console.log(err);
            res.redirect('/adventures');
        } else {
            console.log(req.body.comment);
            Comment.create(req.body.comment, function(err, comment){
                if(err){
                    console.log(err);
                } else {
                    adventure.comments.push(comment);
                    adventure.save();
                    res.redirect('/adventures/' + adventure._id);
                }
            })
        }
    })
    
});

//Middleware
function isLoggedIn(req, res, next) {
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect('/login');
}

module.exports = router;
