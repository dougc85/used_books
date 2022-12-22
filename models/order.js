const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const orderSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  date: {
    type: Date,
    required: true
  },
  total: {
    type: Number,
    required: true
  },
  purchasedBooks: [{
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
  }]
});

module.exports = mongoose.model('Order', orderSchema);