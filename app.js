var express = require('express'),
    app = express();
    
app.set('view engine', 'ejs');
    
app.get('/', function(req, res){
    res.render('landing');
});

app.get('/adventures', function(req, res){
    var adventures = [
            {name: 'Surfing', image: 'https://source.unsplash.com/L5aI2jU0i50/400X300'},
            {name: 'Snowboarding', image: 'https://source.unsplash.com/pOwhy6PDorE/400X300'},
            {name: 'Rock Climbing', image: 'https://source.unsplash.com/uJfwRhfgSnw/400X300'},
            {name: 'Hiking', image: 'https://source.unsplash.com/rHv6C-WTOls/400X300'}
        ]
        
        res.render('adventures', {adventures: adventures});
});
    
app.listen(process.env.PORT, process.env.IP, function(){
    console.log('AdventureCamp Has Started!');
});