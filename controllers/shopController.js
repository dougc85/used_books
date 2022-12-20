const FrontPage = require('../models/frontPage');
const Book = require('../models/book');
const Author = require('../models/author');
const Genre = require('../models/genre');

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

exports.getShopByAuthor = (req, res, next) => {
  Author
    .find()
    .select('firstname lastname')
    .sort({ "lastname": 1, "firstname": 1, "birthyear": 1 })
    .then((authors) => {
      res.render('shop/shopByAuthor', { authors });
    })
};

exports.getShopByGenre = (req, res, next) => {
  Genre
    .find()
    .sort({ "genre": 1 })
    .then((genres) => {
      res.render('shop/shopByGenre', { genres });
    })
};