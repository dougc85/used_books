const FrontPage = require('../models/frontPage');
const Book = require('../models/book');
const Author = require('../models/author');
const Genre = require('../models/genre');

const errorFunction = require('../utilities/errorFunction');

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

  Promise.all([frontPagePromise])
    .then(([frontPage]) => {
      res.render('shop/shopIndex', { frontPage });
    })
    .catch(errorFunction(next));
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
    .catch(errorFunction(next));
}

exports.getShopBookPage = (req, res, next) => {
  Book.findById(req.params.bookId)
    .populate('author', 'firstname lastname')
    .populate('genre')
    .populate('copies')
    .then((book) => {
      res.render('shop/shopBookPage', { book });
    })
    .catch(errorFunction(next));
}

exports.getShopByAuthor = (req, res, next) => {
  Author
    .find()
    .select('firstname lastname')
    .sort({ "lastname": 1, "firstname": 1, "birthyear": 1 })
    .then((authors) => {
      res.render('shop/shopByAuthor', { authors });
    })
    .catch(errorFunction(next));
};

exports.getShopByOneAuthor = (req, res, next) => {
  Author
    .findOne({ _id: req.params.authorId })
    .populate("books", "title imageURL")
    .then(author => {
      res.render('shop/shopByOneAuthor', { author });
    })
    .catch(errorFunction(next));
};

exports.getShopByGenre = (req, res, next) => {
  Genre
    .find()
    .sort({ "genre": 1 })
    .then((genres) => {
      const genresWithBooks = [];
      for (let genre of genres) {
        if (genre.books.length !== 0) {
          genresWithBooks.push(genre);
        }
      }

      res.render('shop/shopByGenre', { genres: genresWithBooks });
    })
    .catch(errorFunction(next));
};

exports.getShopByOneGenre = (req, res, next) => {
  Genre
    .findOne({ _id: req.params.genreId })
    .populate("books", "title")
    .then(genre => {
      res.render('shop/shopByOneGenre', { genre });
    })
    .catch(errorFunction(next));
};