const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const authorSchema = new Schema({
  firstname: {
    type: String
  },
  lastname: {
    type: String,
    required: true
  },
  imageURL: {
    type: String
  },
  birthyear: {
    type: Number,
    required: true,
  },
  deathyear: {
    type: Number
  },
  biography: {
    type: String
  },
  awards: {
    type: [{
      award: {
        type: String,
        required: true
      },
      date: {
        type: Number
      }
    }]
  },
  books: [{
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Book'
  }]
});

module.exports = mongoose.model('Author', authorSchema);