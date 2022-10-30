const Author = require('../models/author');
const Book = require('../models/book');
const Genre = require('../models/genre');

exports.getIndex = (req, res, next) => {
  res.render('admin/adminIndex');
}

exports.getAuthors = (req, res, next) => {
  Author
    .find()
    .select('firstname lastname')
    .sort({ "lastname": 1, "firstname": 1, "birthyear": 1 })
    .then((authors) => {
      res.render('admin/authors', { authors });
    })
}

exports.getAddAuthor = (req, res, next) => {
  res.render('admin/addEditAuthor', { edit: false });
}

exports.postAddAuthor = (req, res, next) => {
  const {
    firstname,
    lastname,
    imageURL,
    birthyear,
    deathyear,
    biography
  } = req.body;

  const author = new Author({
    firstname: firstname.trim(),
    lastname: lastname.trim(),
    imageURL: imageURL.trim(),
    birthyear,
    deathyear,
    biography: biography.trim(),
  })
  author.save()
    .then(() => {
      res.redirect("/admin/authors");
    })
    .catch((err) => {
      console.log(err);
    })
}

exports.getAuthorPage = (req, res, next) => {
  Author.findById(req.params.authorId)
    .then((author) => {
      res.render('admin/authorPage', { author });
    });
}

exports.getEditAuthorPage = (req, res, next) => {
  Author.findById(req.params.authorId)
    .then((author) => {
      res.render('admin/addEditAuthor', { author, edit: true });
    });
}

exports.postEditAuthorPage = (req, res, next) => {
  const {
    firstname,
    lastname,
    imageURL,
    birthyear,
    deathyear,
    biography,
    authorId
  } = req.body;

  Author.findOneAndUpdate({ _id: authorId }, {
    firstname: firstname.trim(),
    lastname: lastname.trim(),
    imageURL: imageURL.trim(),
    birthyear,
    deathyear,
    biography: biography.trim(),
  })
    .then((result) => {
      res.redirect("/admin/authors/" + authorId);
    })
    .catch((err) => {
      console.log(err);
    })
}

exports.getBookCatalogue = (req, res, next) => {
  Book
    .find()
    .select('title')
    .sort({ "title": 1 })
    .then((books) => {
      res.render('admin/bookCatalogue', { books });
    })
}

exports.getGenres = (req, res, next) => {
  Genre
    .find()
    .sort({ "genre": 1 })
    .then((genres) => {
      res.render('admin/genres', { genres });
    })
}

exports.getAddGenre = (req, res, next) => {
  res.render('admin/addEditGenre', { edit: false });
}

exports.postAddGenre = (req, res, next) => {

  const genre = new Genre({
    genre: req.body.genre.trim()
  })
  genre.save()
    .then(() => {
      res.redirect("/admin/genres");
    })
    .catch((err) => {
      console.log(err);
    })
}

exports.getEditGenre = (req, res, next) => {
  Genre.findById(req.params.genreId)
    .then((genre) => {
      res.render('admin/addEditGenre', { genre, edit: true });
    });
}

exports.postEditGenre = (req, res, next) => {

  const { genre, genreId } = req.body;

  console.log(genreId, 'genreId');

  Genre.findOneAndUpdate({ _id: genreId }, {
    genre: genre.trim(),
  })
    .then((result) => {
      res.redirect("/admin/genres/");
    })
    .catch((err) => {
      console.log(err);
    })
}