const Book = require('../../models/book');
const Genre = require('../../models/genre');
const Author = require('../../models/author');

const errorFunction = require('../../utilities/errorFunction');

exports.getBookCatalogue = async function (req, res, next) {

  Book
    .find()
    .select('title')
    .sort({ "title": 1 })
    .then((books) => {
      res.render('admin/bookCatalogue', { books, backText: 'Admin', backHref: '/admin' });
    })
    .catch(errorFunction(next));
}

exports.getAddBookToCatalogue = async (req, res, next) => {

  const genresPromise = Genre.find()
    .sort({ "genre": 1 });

  const authorsPromise = Author
    .find()
    .sort({ "lastname": 1, "firstname": 1, "birthyear": 1 })
    .select('lastname firstname');

  Promise.all([authorsPromise, genresPromise])
    .then(resultsArray => {
      const [authors, genres] = resultsArray;

      res.render('admin/addEditCatalogueBook', { authors, genres, edit: false, book: undefined, backText: 'Catalogue', backHref: '/admin/book_catalogue' })
    })
    .catch(errorFunction(next));
}

exports.postAddBookToCatalogue = (req, res, next) => {
  const {
    title,
    imageURL,
    author,
    genre,
    description,
  } = req.body;

  const book = new Book({
    title: title.trim(),
    imageURL: imageURL.trim(),
    author,
    genre,
    description: description.trim(),
  })

  book.save()
    .then((book) => {
      const authorPromise = Author.findOneAndUpdate({ _id: author }, {
        $push: {
          "books": book._id,
        }
      })
      const genrePromise = Genre.findOneAndUpdate({ _id: genre }, {
        $push: {
          "books": book._id,
        }
      })
      return Promise.all(authorPromise, genrePromise);
    })
    .then(() => {
      res.redirect("/admin/book_catalogue");
    })
    .catch(errorFunction(next));
}

exports.getCatalogueBookPage = (req, res, next) => {
  Book.findById(req.params.bookId)
    .populate('author', 'firstname lastname')
    .populate('genre')
    .then((book) => {
      res.render('admin/catalogueBook', { book, backText: 'Catalogue', backHref: '/admin/book_catalogue' });
    })
    .catch(errorFunction(next));
}

exports.getEditCatalogueBookPage = (req, res, next) => {
  const genresPromise = Genre.find()
    .sort({ "genre": 1 });

  const authorsPromise = Author
    .find()
    .sort({ "lastname": 1, "firstname": 1, "birthyear": 1 })
    .select('lastname firstname');

  const bookPromise = Book
    .findById(req.params.bookId);

  Promise.all([authorsPromise, genresPromise, bookPromise])
    .then(resultsArray => {
      const [authors, genres, book] = resultsArray;
      res.render('admin/addEditCatalogueBook', { authors, genres, book, edit: true, backHref: '/admin' + req.url.slice(0, -5), backText: 'Book Info' });
    })
    .catch(errorFunction(next));
}

exports.postEditCatalogueBookPage = (req, res, next) => {
  const {
    title,
    imageURL,
    author,
    genre,
    description,
    bookId
  } = req.body;

  Book.findOne({ _id: bookId })
    .then(oldBook => {

      const promises = [];

      const bookPromise = Book.findOneAndUpdate({ _id: bookId }, {
        title: title.trim(),
        imageURL: imageURL.trim(),
        author,
        genre,
        description: description.trim(),
      })

      promises.push(bookPromise);

      if (author !== oldBook.author.toString()) {
        const authorPromise = Author.findOneAndUpdate({ _id: author }, {
          $addToSet: {
            "books": bookId,
          }
        });

        promises.push(authorPromise);

        const oldAuthorPromise = Author.findOneAndUpdate({ _id: oldBook.author }, {
          $pull: {
            "books": bookId,
          }
        })

        promises.push(oldAuthorPromise);
      }

      if (genre !== oldBook.genre.toString()) {
        const genrePromise = Genre.findOneAndUpdate({ _id: genre }, {
          $addToSet: {
            "books": bookId,
          }
        });

        promises.push(genrePromise);

        const oldGenrePromise = Genre.findOneAndUpdate({ _id: oldBook.genre }, {
          $pull: {
            "books": bookId,
          }
        })

        promises.push(oldGenrePromise);
      }

      Promise.all(promises)
        .then((result) => {
          res.redirect("/admin/book_catalogue/" + bookId);
        })
        .catch(errorFunction(next));
    })
    .catch(errorFunction(next));
}
