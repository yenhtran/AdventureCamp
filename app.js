var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'); 
    
mongoose.connect('mongodb://localhost/livin_adventures');
app.use(bodyParser.urlencoded({extended: true}));    
app.set('view engine', 'ejs');

// SCHEMA SETUP
var adventureSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String
});

var Adventure = mongoose.model('Adventure', adventureSchema);

Adventure.create(
    {
        name: 'Snowboarding', 
        image: 'https://source.unsplash.com/pOwhy6PDorE/400X300',
        description: 'Come join us in Utah for some of the best powder in the US!'
        
    }, function(err, adventure){
        if (err) {
            console.log(err);
        } else {
            console.log('NEWLY CREATED ADVENTURE');
            console.log(adventure);
        }
    });
    
app.get('/', function(req, res){
    res.render('landing');
});

app.get('/adventures', function(req, res){
    //get all adventures from DB
    Adventure.find({}, function(err, alladventures) {
        if(err){
            console.log(err);
        } else {
            res.render('adventures', {adventures: alladventures})
        }
    });
    //res.render('adventures', {adventures: adventures});
});

app.post('/adventures', function(req, res){
    var name = req.body.name,
        image = req.body.image,
        newAdventure = {name: name, image: image};

    Adventure.create(newAdventure, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            res.redirect('/adventures');
        }
    });
});

app.get('/adventures/new', function(req, res) {
    res.render('new.ejs');
});

app.get('/adventures/:id', function(req, res) {
    //find adventure with ID
    //render show template with that adventure
    res.send('THIS WILL BE SHOW PAGE');
})
    
app.listen(process.env.PORT, process.env.IP, function(){
    console.log('LivinAdventures Has Started!');
});