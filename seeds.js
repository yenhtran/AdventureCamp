var mongoose = require('mongoose'),
    Adventure = require('./models/adventure'),
    Comment = require('./models/comment');
    
var data = [
    {
        name: 'Surfing', 
        image: 'https://source.unsplash.com/L5aI2jU0i50/400X300',
        description: 'Show off your sick surf skillz with us!'
        
    }, {
        name: 'Snowboarding', 
        image: 'https://source.unsplash.com/pOwhy6PDorE/400X300',
        description: 'Come catch some of the best powder in Utah!'
    }, {
        name: 'Rock Climbing', 
        image: 'https://source.unsplash.com/uJfwRhfgSnw/400X300',
        description: 'You know you want to conquer that mountain!'
    }, {
        name: 'Hiking', 
        image: 'https://source.unsplash.com/rHv6C-WTOls/400X300',
        description: 'Help us find elves!'
        
    }, {
        name: 'Camping', 
        image: 'https://source.unsplash.com/ilkTnuMunP8/400X300',
        description: 'We need help setting up tent, so please come with us!'
    }, {
        name: 'Napping', 
        image: 'https://source.unsplash.com/t8SxccV0Agw/400X300',
        description: 'zzzzz...zzzzz..zzzz..zzzz..zzzz...'
    }, {
        name: 'Diving', 
        image: 'https://source.unsplash.com/6vjJZYYIiBw/400X300',
        description: 'It is a party under the sea!'
    }
];
    
function seedDB() {
    //Remove all adventures
    Adventure.remove({}, function(err){
        if(err){
            console.log(err);
        }
        console.log('removed adventures!');
        //add in new adventures
        data.forEach(function(seed){
            Adventure.create(seed, function(err, adventure){
                if(err){
                    console.log(err);
                } else {
                    console.log('added a adventure');
                    //create a comment
                    Comment.create(
                        {
                            text: 'I am in! Cant wait to hang with you guys!',
                            author: 'Yentizzle'
                        }, function(err, comment){
                            if (err){
                                console.log(err);
                            } else {
                                adventure.comments.push(comment);
                                adventure.save();
                                console.log('created a new comment');
                            }
                        }
                    );
                }
            })
        })
    });
}

module.exports = seedDB;
