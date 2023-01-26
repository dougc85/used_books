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
    type: Schema.Types.ObjectID,
    required: true,
    ref: 'Genre',
  },
  description: {
    type: String,
    required: true,
  },
  imageURL: {
    type: String,
    required: true,
  },
  awards: {
    type: [String]
  },
  copies: [{
    type: Schema.Types.ObjectId,
    ref: 'BookInStock'
  }]
});

module.exports = mongoose.model('Book', bookSchema);