const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const bookSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  author: {
    type: Schema.Types.ObjectID,
    required: true,
    ref: 'Author'
  },
  genre: {
    type: [String],
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  awards: {
    type: [String]
  }
});

module.exports = mongoose.model('Book', bookSchema);