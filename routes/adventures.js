var express = require('express'),
    router = express.Router(),
    Adventure = require('../models/adventure'),
    Comment = require('../models/comment'),
    middleware = require('../middleware'),
    geocoder = require('geocoder');

//INDEX - show all adventures
router.get('/', function(req, res) {
    Adventure.find({}, function(err, alladventures) {
        if (err) {
            console.log(err);
        } else {
            res.render('adventures/index', { adventures: alladventures })
        }
    });
});

//CREATE - add new adventure to DB
router.post('/', middleware.isLoggedIn, function(req, res) {
    var name = req.body.name,
        image = req.body.image,
        price = req.body.price,
        description = req.body.description,
        author = {
            id: req.user._id,
            username: req.user.username
        };

    geocoder.geocode(req.body.location, function(err, data) {
        if (err) {
            console.log(err);
        }
        var lat = data.results[0].geometry.location.lat,
            lng = data.results[0].geometry.location.lng,
            location = data.results[0].formatted_address,
            newAdventure = {
                name: name,
                image: image,
                description: description,
                author: author,
                price: price,
                location: location,
                lat: lat,
                lng: lng
            };
        Adventure.create(newAdventure, function(err, newlyCreated){
            if (err) {
                console.log(err);
            } else {
                console.log(newlyCreated);
                res.redirect('/adventures');
            }
        });
    });
});

//NEW - show form to create new adventure
router.get('/new', middleware.isLoggedIn, function(req, res) {
    res.render('adventures/new.ejs');
});

//SHOW - shows more info about specific adventure
router.get('/:id', function(req, res) {
    //find adventure with ID
    Adventure.findById(req.params.id).populate('comments').exec(function(err, foundAdventure) {
        if (err) {
            console.log(err);
        } else {
            console.log(foundAdventure);
            res.render('adventures/show', { adventure: foundAdventure });
        }
    });
});

//EDIT ADVENTURE ROUTES
router.get('/:id/edit', middleware.checkAdventureOwnership, function(req, res) {
    //is user logged in?
    Adventure.findById(req.params.id, function(err, foundAdventure) {
        if (err) {
            req.flash('error', 'Adventure not found');
        }
        res.render('adventures/edit', { adventure: foundAdventure });
    });
});

//UPDATE ADVENTURE ROUTES
router.put('/:id', middleware.checkAdventureOwnership, function(req, res) {
    Adventure.findByIdAndUpdate(req.params.id, req.body.adventure, function(err, updatedAdventure) {
        if (err) {
            res.redirect('/adventures');
        } else {
            res.redirect('/adventures/' + req.params.id);
        }
    })
});

//DESTROY ADVENTURE ROUTE
router.delete('/:id', middleware.checkAdventureOwnership, function(req, res) {
    Adventure.findByIdAndRemove(req.params.id, function(err, adventure) {
        Comment.remove({
            _id: {
                $in: adventure.comments
            }
        }, function(err, comments) {
            if (err) {
                console.log(err);
            } else {
                req.flash('error', adventure.name + 'deleted!');
                res.redirect('/adventures');    
            }
        });
    });
});

module.exports = router;