var mongoose = require('mongoose');

var homeSchema = new mongoose.Schema({
    no: String,
    name: String,
    music: String,
    image: String
});

module.exports = mongoose.model('Home', homeSchema);