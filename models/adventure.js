var mongoose = require('mongoose');

// SCHEMA SETUP
var adventureSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String
});

module.exports = mongoose.model('Adventure', adventureSchema);