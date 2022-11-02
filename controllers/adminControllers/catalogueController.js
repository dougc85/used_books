const Book = require('../../models/book');
const Genre = require('../../models/genre');
const Author = require('../../models/author');

exports.getBookCatalogue = (req, res, next) => {
  Book
    .find()
    .select('title')
    .sort({ "title": 1 })
    .then((books) => {
      res.render('admin/bookCatalogue', { books });
    })
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

      res.render('admin/addEditCatalogueBook', { authors, genres, edit: false })
    })
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
      return Author.findOneAndUpdate({ _id: author }, {
        $push: {
          "books": book._id,
        }
      })
    })
    .then(() => {
      res.redirect("/admin/book_catalogue");
    })
    .catch((err) => {
      console.log(err);
    })
}

exports.getCatalogueBookPage = (req, res, next) => {
  Book.findById(req.params.bookId)
    .populate('author', 'firstname lastname')
    .populate('genre')
    .then((book) => {
      console.log(book, 'book');
      res.render('admin/catalogueBook', { book });
    })
}

