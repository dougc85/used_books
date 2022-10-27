const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const genreSchema = new Schema({
  genre: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model('Genre', genreSchema);