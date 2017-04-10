var mongoose = require('mongoose'),
    Adventure = require('./models/adventure'),
    Comment = require('./models/comment');
    
var data = [
    {
        name: 'Surfing', 
        image: 'https://source.unsplash.com/L5aI2jU0i50/400X300',
        description: 'Show off your sick surf skillz with us! Four dollar toast austin kogi YOLO, craft beer meh crucifix shoreditch +1 four loko. Migas tofu disrupt kombucha. Williamsburg austin kitsch offal bushwick pop-up stumptown, schlitz mustache raclette copper mug iceland tacos ethical DIY. Direct trade tofu umami kitsch. Cronut etsy wolf photo booth, chillwave synth viral put a bird on it echo park cliche kombucha. Pop-up lo-fi 3 wolf moon, venmo seitan put a bird on it vexillologist pour-over pork belly. Shabby chic fap kogi poutine post-ironic. Wolf quinoa swag YOLO try-hard kale chips, jean shorts man bun synth. Subway tile 8-bit live-edge, tbh organic cold-pressed XOXO umami gluten-free. Actually ennui flexitarian next level synth. Salvia marfa gentrify microdosing kombucha. Before they sold out echo park tattooed 8-bit, gastropub bushwick edison bulb single-origin coffee put a bird on it. Asymmetrical PBR&B food truck neutra, 8-bit green juice distillery glossier beard brunch actually. Cliche prism cold-pressed, listicle schlitz af portland.'
        
    }, {
        name: 'Snowboarding', 
        image: 'https://source.unsplash.com/pOwhy6PDorE/400X300',
        description: 'Come catch some of the best powder in Utah! Four dollar toast austin kogi YOLO, craft beer meh crucifix shoreditch +1 four loko. Migas tofu disrupt kombucha. Williamsburg austin kitsch offal bushwick pop-up stumptown, schlitz mustache raclette copper mug iceland tacos ethical DIY. Direct trade tofu umami kitsch. Cronut etsy wolf photo booth, chillwave synth viral put a bird on it echo park cliche kombucha. Pop-up lo-fi 3 wolf moon, venmo seitan put a bird on it vexillologist pour-over pork belly. Shabby chic fap kogi poutine post-ironic. Wolf quinoa swag YOLO try-hard kale chips, jean shorts man bun synth. Subway tile 8-bit live-edge, tbh organic cold-pressed XOXO umami gluten-free. Actually ennui flexitarian next level synth. Salvia marfa gentrify microdosing kombucha. Before they sold out echo park tattooed 8-bit, gastropub bushwick edison bulb single-origin coffee put a bird on it. Asymmetrical PBR&B food truck neutra, 8-bit green juice distillery glossier beard brunch actually. Cliche prism cold-pressed, listicle schlitz af portland.'
    }, {
        name: 'Rock Climbing', 
        image: 'https://source.unsplash.com/uJfwRhfgSnw/400X300',
        description: 'You know you want to conquer that mountain! Four dollar toast austin kogi YOLO, craft beer meh crucifix shoreditch +1 four loko. Migas tofu disrupt kombucha. Williamsburg austin kitsch offal bushwick pop-up stumptown, schlitz mustache raclette copper mug iceland tacos ethical DIY. Direct trade tofu umami kitsch. Cronut etsy wolf photo booth, chillwave synth viral put a bird on it echo park cliche kombucha. Pop-up lo-fi 3 wolf moon, venmo seitan put a bird on it vexillologist pour-over pork belly. Shabby chic fap kogi poutine post-ironic. Wolf quinoa swag YOLO try-hard kale chips, jean shorts man bun synth. Subway tile 8-bit live-edge, tbh organic cold-pressed XOXO umami gluten-free. Actually ennui flexitarian next level synth. Salvia marfa gentrify microdosing kombucha. Before they sold out echo park tattooed 8-bit, gastropub bushwick edison bulb single-origin coffee put a bird on it. Asymmetrical PBR&B food truck neutra, 8-bit green juice distillery glossier beard brunch actually. Cliche prism cold-pressed, listicle schlitz af portland.'
    }, {
        name: 'Hiking', 
        image: 'https://source.unsplash.com/rHv6C-WTOls/400X300',
        description: 'Help us find elves! Four dollar toast austin kogi YOLO, craft beer meh crucifix shoreditch +1 four loko. Migas tofu disrupt kombucha. Williamsburg austin kitsch offal bushwick pop-up stumptown, schlitz mustache raclette copper mug iceland tacos ethical DIY. Direct trade tofu umami kitsch. Cronut etsy wolf photo booth, chillwave synth viral put a bird on it echo park cliche kombucha. Pop-up lo-fi 3 wolf moon, venmo seitan put a bird on it vexillologist pour-over pork belly. Shabby chic fap kogi poutine post-ironic. Wolf quinoa swag YOLO try-hard kale chips, jean shorts man bun synth. Subway tile 8-bit live-edge, tbh organic cold-pressed XOXO umami gluten-free. Actually ennui flexitarian next level synth. Salvia marfa gentrify microdosing kombucha. Before they sold out echo park tattooed 8-bit, gastropub bushwick edison bulb single-origin coffee put a bird on it. Asymmetrical PBR&B food truck neutra, 8-bit green juice distillery glossier beard brunch actually. Cliche prism cold-pressed, listicle schlitz af portland.'
        
    }, {
        name: 'Camping', 
        image: 'https://source.unsplash.com/ilkTnuMunP8/400X300',
        description: 'We need help setting up tent, so please come with us! Four dollar toast austin kogi YOLO, craft beer meh crucifix shoreditch +1 four loko. Migas tofu disrupt kombucha. Williamsburg austin kitsch offal bushwick pop-up stumptown, schlitz mustache raclette copper mug iceland tacos ethical DIY. Direct trade tofu umami kitsch. Cronut etsy wolf photo booth, chillwave synth viral put a bird on it echo park cliche kombucha. Pop-up lo-fi 3 wolf moon, venmo seitan put a bird on it vexillologist pour-over pork belly. Shabby chic fap kogi poutine post-ironic. Wolf quinoa swag YOLO try-hard kale chips, jean shorts man bun synth. Subway tile 8-bit live-edge, tbh organic cold-pressed XOXO umami gluten-free. Actually ennui flexitarian next level synth. Salvia marfa gentrify microdosing kombucha. Before they sold out echo park tattooed 8-bit, gastropub bushwick edison bulb single-origin coffee put a bird on it. Asymmetrical PBR&B food truck neutra, 8-bit green juice distillery glossier beard brunch actually. Cliche prism cold-pressed, listicle schlitz af portland.'
    }, {
        name: 'Napping', 
        image: 'https://source.unsplash.com/t8SxccV0Agw/400X300',
        description: 'zzzzz...zzzzz..zzzz..zzzz..zzzz... Four dollar toast austin kogi YOLO, craft beer meh crucifix shoreditch +1 four loko. Migas tofu disrupt kombucha. Williamsburg austin kitsch offal bushwick pop-up stumptown, schlitz mustache raclette copper mug iceland tacos ethical DIY. Direct trade tofu umami kitsch. Cronut etsy wolf photo booth, chillwave synth viral put a bird on it echo park cliche kombucha. Pop-up lo-fi 3 wolf moon, venmo seitan put a bird on it vexillologist pour-over pork belly. Shabby chic fap kogi poutine post-ironic. Wolf quinoa swag YOLO try-hard kale chips, jean shorts man bun synth. Subway tile 8-bit live-edge, tbh organic cold-pressed XOXO umami gluten-free. Actually ennui flexitarian next level synth. Salvia marfa gentrify microdosing kombucha. Before they sold out echo park tattooed 8-bit, gastropub bushwick edison bulb single-origin coffee put a bird on it. Asymmetrical PBR&B food truck neutra, 8-bit green juice distillery glossier beard brunch actually. Cliche prism cold-pressed, listicle schlitz af portland.'
    }, {
        name: 'Diving', 
        image: 'https://source.unsplash.com/6vjJZYYIiBw/400X300',
        description: 'It is a party under the sea! Four dollar toast austin kogi YOLO, craft beer meh crucifix shoreditch +1 four loko. Migas tofu disrupt kombucha. Williamsburg austin kitsch offal bushwick pop-up stumptown, schlitz mustache raclette copper mug iceland tacos ethical DIY. Direct trade tofu umami kitsch. Cronut etsy wolf photo booth, chillwave synth viral put a bird on it echo park cliche kombucha. Pop-up lo-fi 3 wolf moon, venmo seitan put a bird on it vexillologist pour-over pork belly. Shabby chic fap kogi poutine post-ironic. Wolf quinoa swag YOLO try-hard kale chips, jean shorts man bun synth. Subway tile 8-bit live-edge, tbh organic cold-pressed XOXO umami gluten-free. Actually ennui flexitarian next level synth. Salvia marfa gentrify microdosing kombucha. Before they sold out echo park tattooed 8-bit, gastropub bushwick edison bulb single-origin coffee put a bird on it. Asymmetrical PBR&B food truck neutra, 8-bit green juice distillery glossier beard brunch actually. Cliche prism cold-pressed, listicle schlitz af portland.'
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
