var mongoose = require('mongoose');

var contactSchema = new mongoose.Schema({
    name      : String,
    email     : String,
    message   : String,
    
});

module.exports = mongoose.model('Contact', contactSchema);