
const Genre = require('../../models/genre');

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

