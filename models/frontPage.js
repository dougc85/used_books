const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const frontPageSchema = new Schema({
  featuredAuthor: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Author'
  },
  suggestedBooks: [{
    type: Schema.Types.ObjectId,
    ref: 'Book',
  }]
})

module.exports = mongoose.model('FrontPage', frontPageSchema);