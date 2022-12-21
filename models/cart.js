const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const cartSchema = new Schema({
  user: {
    type: String,
  },
  copies: [{
    type: Schema.Types.ObjectId,
    ref: 'BookInStock'
  }],
});

module.exports = mongoose.model('Cart', cartSchema);