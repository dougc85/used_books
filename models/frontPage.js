const mongoose = require('mongoose');

const Schema = mongoose.Schema;

function arrayLength(val) {
  return val.length === 4;
}

const frontPageSchema = new Schema({
  featuredAuthor: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Author'
  },
  suggestedBooks: [{
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Book',
    validate: [arrayLength, 'Array must have 4 items']
  }]
})

module.exports = mongoose.model('FrontPage', frontPageSchema);