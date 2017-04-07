var express = require('express'),
    app = express();
    
app.get('/', function(req, res){
    res.send('this will be the landing page soon!');
});
    
app.listen(process.env.PORT, process.env.IP, function(){
    console.log('AdventureCamp Has Started!');
});