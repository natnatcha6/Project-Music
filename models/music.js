var mongoose = require('mongoose');

var musicSchema = new mongoose.Schema({
    name: String,
    music: String,
    image: String,
    audio: String,
    melody: String,
});

module.exports = mongoose.model('Music', musicSchema);