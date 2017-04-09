var mongoose = require('mongoose');

// SCHEMA SETUP
var adventureSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String,
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Comment'
        }
    ]
});

module.exports = mongoose.model('Adventure', adventureSchema);