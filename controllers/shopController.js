const FrontPage = require('../models/frontPage');
const Book = require('../models/book');
const book = require('../models/book');

exports.getIndex = (req, res, next) => {
  const frontPagePromise =
    FrontPage
      .findOne()
      .populate({
        path: 'suggestedBooks',
        populate: [{
          path: 'genre',
        },
        {
          path: 'author',
        }]
      })
      .populate({
        path: 'featuredAuthor',
        populate: { path: 'books' }
      })
      .exec();

  Promise.all([frontPagePromise]).then(([frontPage]) => {
    res.render('shop/shopIndex', { frontPage });
  })
}

exports.getShopByTitle = (req, res, next) => {
  Book
    .find()
    .select('title copies')
    .sort({ "title": 1 })
    .then((books) => {
      const booksWithCopies = [];
      for (let book of books) {
        if (book.copies.length !== 0) {
          booksWithCopies.push(book);
        }
      }
      res.render('shop/shopByTitle', { books: booksWithCopies });
    })

}