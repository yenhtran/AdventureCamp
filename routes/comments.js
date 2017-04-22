var express = require('express'),
    router = express.Router({mergeParams: true}),
    Adventure = require('../models/adventure'),
    Comment = require('../models/comment'),
    middleware = require('../middleware');

//Comments New
router.get('/new', middleware.isLoggedIn, function(req, res) {
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
router.post('/', middleware.isLoggedIn, function(req, res){
    Adventure.findById(req.params.id, function(err, adventure) {
        if (err) {
            console.log(err);
            res.redirect('/adventures');
        } else {
            Comment.create(req.body.comment, function(err, comment){
                if(err){
                    req.flash('error', 'Something went wrong');
                    console.log(err);
                } else {
                    //add username and id to comment
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    //save comment
                    comment.save();
                    adventure.comments.push(comment);
                    adventure.save();
                    req.flash('success', 'Successfully added comment!');
                    res.redirect('/adventures/' + adventure._id);
                }
            })
        }
    });
    
});

//COMMENTS EDIT ROUTE
router.get('/:comment_id/edit', middleware.checkCommentOwnership, function(req, res){
    Comment.findById(req.params.comment_id, function(err, foundComment) {
        if(err){
            res.redirect('back');
        } else {
          res.render('comments/edit', { adventure_id: req.params.id, comment: foundComment});  
        }
    });
    
});

//COMMENT UPDATE ROUTE
router.put('/:comment_id', middleware.checkCommentOwnership, function(req, res) {
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment) {
        if(err){
            console.log(err);
            res.redirect('back');
        } else {
            res.redirect('/adventures/' + req.params.id );
        }
    })
});

//COMMENT DELETE ROUTE
router.delete('/:comment_id', middleware.checkCommentOwnership ,function(req, res) {
    Comment.findByIdAndRemove(req.params.comment_id, function(err, comment) {
        if(err){
            console.log(err);
            res.redirect('back');
        } else {
            Campground.findByIdAndUpdate(req.params.id, {
                $pull: {
                    comments: comment.id
                }
            }, function(err) {
                if (err) {
                    console.log(err)
                } else {
                    req.flash('success', 'Comment deleted');
                    res.redirect('/adventures/' + req.params.id);
                }
            });
        }
    })
});

module.exports = router;
