var mongoose = require('mongoose');

var favoriteSchema = new mongoose.Schema({
    username: String,
    music: String,
    name: String,
    image: String,
});
      
module.exports = mongoose.model('Favorite', favoriteSchema);