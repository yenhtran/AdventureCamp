var express = require('express'),
    router = express.Router(),
    User = require('../models/user'),
    passport = require('passport');

//Root Route
router.get('/', function(req, res){
    res.render('landing');
});


//Shows register form
router.get('/register', function(req, res) {
    res.render('register');
});

//Handle sign up logic
router.post('/register', function(req, res) {
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            req.flash('error', err.message );
            console.log(err);
            return res.render('register');
        }
        passport.authenticate('local')(req, res, function(){
            req.flash('success', 'Welcome to LivinAdventures ' + user.username );
            res.redirect('/adventures');
        });
    });
});

//Show login form
router.get('/login', function(req, res) {
    res.render('login');
});

//Handeling login logic
router.post('/login', passport.authenticate('local', 
    {   
        successRedirect: '/adventures',
        failureRedirect: '/login'
    }), function(req, res) {
        
});

//Logout route
router.get('/logout', function(req, res) {
    req.logout();
    req.flash('success', 'Logged you out!');
    res.redirect('/adventures');
});

module.exports = router;