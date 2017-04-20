var express = require('express'),
    router = express.Router(),
    Adventure = require('../models/adventure.js');

//INDEX - show all adventures
router.get('/', function(req, res){
    Adventure.find({}, function(err, alladventures) {
        if(err){
            console.log(err);
        } else {
            res.render('adventures/index', {adventures: alladventures})
        }
    });
});

//CREATE - add new adventure to DB
router.post('/', isLoggedIn, function(req, res){
    var name = req.body.name,
        image = req.body.image,
        description = req.body.description,
        author = {
            id: req.user._id,
            username: req.user.username
        },
        newAdventure = {name: name, image: image, description: description, author: author};
        
    Adventure.create(newAdventure, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            res.redirect('/adventures');
        }
    });
});

//NEW - show form to create new adventure
router.get('/new', isLoggedIn, function(req, res) {
    res.render('adventures/new.ejs');
});

//SHOW - shows more info about specific adventure
router.get('/:id', function(req, res) {
    //find adventure with ID
    Adventure.findById(req.params.id).populate('comments').exec(function(err, foundAdventure){
       if(err){
           console.log(err);
       } else {
           console.log(foundAdventure);
           res.render('adventures/show', {adventure: foundAdventure});
       }
    });
});

//EDIT ADVENTURE ROUTES
router.get('/:id/edit', checkAdventureOwnership, function(req, res) {
    //is user logged in?
    Adventure.findById(req.params.id, function(err, foundAdventure){
        res.render('adventures/edit', {adventure: foundAdventure});
    });
});

//UPDATE ADVENTURE ROUTES
router.put('/:id', checkAdventureOwnership, function(req, res) {
    Adventure.findByIdAndUpdate(req.params.id, req.body.adventure, function(err, updatedAdventure) {
        if(err){
            res.redirect('/adventures');
        } else {
            res.redirect('/adventures/' + req.params.id);
        }
    })
});

//DESTROY ADVENTURE ROUTE
router.delete('/:id', checkAdventureOwnership, function(req, res){
    Adventure.findByIdAndRemove(req.params.id, function(err){
        if (err) {
            res.redirect('/adventures');
        } else {
            res.redirect('/adventures');
        }
    });
});

//Middleware
function isLoggedIn(req, res, next) {
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect('/login');
}

function checkAdventureOwnership(req, res, next) {
    if (req.isAuthenticated()) {
        Adventure.findById(req.params.id, function(err, foundAdventure){
            if(err){
                res.redirect('back')
            } else {
                // does user own the adventure?
                // .equals is given to us by mongoose
                if(foundAdventure.author.id.equals(req.user._id)) {
                    next();
                } else {
                    res.redirect('back');
                }
            }
        });
    } else {
        res.redirect('back');
    }
}

module.exports = router;