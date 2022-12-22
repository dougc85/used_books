const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  orders: [{
    type: Schema.Types.ObjectId,
    ref: 'Order',
  }],
  cart: [{
    type: Schema.Types.ObjectId,
    ref: 'BookInStock'
  }],
});

module.exports = mongoose.model('User', userSchema);