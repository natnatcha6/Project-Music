var mongoose = require('mongoose');

var slideSchema = new mongoose.Schema({
    image: String,
    class: String
});

module.exports = mongoose.model('Slide', slideSchema);


