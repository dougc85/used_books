
const Genre = require('../../models/genre');

const errorFunction = require('../../utilities/errorFunction');

exports.getGenres = (req, res, next) => {
  Genre
    .find()
    .sort({ "genre": 1 })
    .then((genres) => {
      res.render('admin/genres', { genres, backText: 'Admin', backHref: '/admin' });
    })
    .catch(errorFunction(next));
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
    .catch(errorFunction(next));
}

exports.getEditGenre = (req, res, next) => {
  Genre.findById(req.params.genreId)
    .then((genre) => {
      res.render('admin/addEditGenre', { genre, edit: true, backHref: '/admin/genres', backText: 'Genres' });
    })
    .catch(errorFunction(next));
}

exports.postEditGenre = (req, res, next) => {

  const { genre, genreId } = req.body;

  Genre.findOneAndUpdate({ _id: genreId }, {
    genre: genre.trim(),
  })
    .then((result) => {
      res.redirect("/admin/genres/");
    })
    .catch(errorFunction(next));
}

