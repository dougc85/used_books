
const Genre = require('../../models/genre');

exports.getGenres = (req, res, next) => {
  Genre
    .find()
    .sort({ "genre": 1 })
    .then((genres) => {
      res.render('admin/genres', { genres, backText: 'Admin', backHref: '/admin' });
    })
}

exports.getAddGenre = (req, res, next) => {
  res.render('admin/addEditGenre', { edit: false, backText: 'Genres', backHref: '/admin/genres' });
}

exports.postAddGenre = (req, res, next) => {

  const genre = new Genre({
    genre: req.body.genre.trim(),
    books: [],
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
      res.render('admin/addEditGenre', { genre, edit: true, backHref: '/admin/genres', backText: 'Genres' });
    });
}

exports.postEditGenre = (req, res, next) => {

  const { genre, genreId } = req.body;

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

