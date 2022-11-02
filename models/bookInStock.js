const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const bookInStockSchema = new Schema({
  book: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Book'
  },
  price: {
    type: Number,
    required: true,
  },
  imageURL: {
    type: String,
  },
  yearPublished: {
    type: Number,
    required: true,
  },
  condition: {
    type: String,
    required: true,
    enum: ['Like New', 'Good', 'Fair', 'Poor'],
  },
  translator: {
    type: String,
  },
  editor: {
    type: String,
  },
  edition: {
    type: String,
  }
})

module.exports = mongoose.model('BookInStock', bookInStockSchema, 'inventory');