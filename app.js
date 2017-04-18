var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    passport = require('passport'),
    LocalStrategy = require('passport-local'),
    Adventure = require('./models/adventure'),
    Comment = require('./models/comment'),
    User = require('./models/user'),
    seedDB = require('./seeds');
    
    
mongoose.connect('mongodb://localhost/livin_adventures');
app.use(bodyParser.urlencoded({extended: true}));    
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
seedDB();

// PASSPORT CONFIGURATION
app.use(require('express-session')({
    secret: 'The mountains are calling!',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//================
// ROUTES
//================

app.get('/', function(req, res){
    res.render('landing');
});

app.get('/adventures', function(req, res){
    Adventure.find({}, function(err, alladventures) {
        if(err){
            console.log(err);
        } else {
            res.render('adventures/index', {adventures: alladventures})
        }
    });
});

app.post('/adventures', function(req, res){
    var name = req.body.name,
        image = req.body.image,
        description = req.body.description,
        newAdventure = {name: name, image: image, description: description};

    Adventure.create(newAdventure, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            res.redirect('/adventures');
        }
    });
});

app.get('/adventures/new', function(req, res) {
    res.render('adventures/new.ejs');
});

//SHOW - shows more info about specific adventure
app.get('/adventures/:id', function(req, res) {
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

//================
// COMMENTS ROUTES
//================

app.get('/adventures/:id/comments/new', function(req, res) {
    //find adventure by id
    Adventure.findById(req.params.id, function(err, adventure){
        if(err){
            console.log(err);
        } else {
            res.render('comments/new',{adventure: adventure});
        }
    })
});

app.post('/adventures/:id/comments', function(req, res){
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

//================
// AUTH ROUTES
//================

//shows register form
app.get('/register', function(req, res) {
    res.render('register');
});

//handle sign up logic
app.post('/register', function(req, res) {
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            console.log(err);
            return res.render('register');
        }
        passport.authenticate('local')(req, res, function(){
            res.redirect('/adventures');
        });
    });
});
    
app.listen(process.env.PORT, process.env.IP, function(){
    console.log('LivinAdventures Has Started!');
});