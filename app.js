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

// Adventure.create(
//     {
//         name: 'Snowboarding', 
//         image: 'https://source.unsplash.com/pOwhy6PDorE/400X300',
//         description: 'Come join us in Utah for some of the best powder in the US!'
        
//     }, function(err, adventure){
//         if (err) {
//             console.log(err);
//         } else {
//             console.log('NEWLY CREATED ADVENTURE');
//             console.log(adventure);
//         }
//     });
    
app.get('/', function(req, res){
    res.render('landing');
});

app.get('/adventures', function(req, res){
    Adventure.find({}, function(err, alladventures) {
        if(err){
            console.log(err);
        } else {
            res.render('index', {adventures: alladventures})
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
    res.render('new.ejs');
});

//SHOW - shows more info about specific adventure
app.get('/adventures/:id', function(req, res) {
    //find adventure with ID
    Adventure.findById(req.params.id, function(err, foundAdventure){
       if(err){
           console.log(err);
       } else {
           res.render('show', {adventure: foundAdventure});
       }
    });
})
    
app.listen(process.env.PORT, process.env.IP, function(){
    console.log('LivinAdventures Has Started!');
});