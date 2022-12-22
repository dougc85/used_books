const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  orders: [{
    total: {
      type: Number,
      required: true
    },
    date: {
      type: Date,
      required: true,
    },
    order: {
      type: Schema.Types.ObjectId,
      ref: 'Order',
    }
  }],
  cart: [{
    type: Schema.Types.ObjectId,
    ref: 'BookInStock'
  }],
});

module.exports = mongoose.model('User', userSchema);