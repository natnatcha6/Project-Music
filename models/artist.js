var mongoose = require('mongoose');

var artistSchema = new mongoose.Schema({
    name      : String,
    image     : String,
    
});

module.exports = mongoose.model('Artist', artistSchema);