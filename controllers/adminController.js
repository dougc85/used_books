const Author = require('../models/author');

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
  res.render('admin/addAuthor');
}

exports.postAddAuthor = (req, res, next) => {
  const {
    firstname,
    lastname,
    birthyear,
    deathyear,
    biography
  } = req.body;

  const author = new Author({
    firstname,
    lastname,
    birthyear,
    deathyear,
    biography
  })
  author.save()
    .then(() => {
      res.redirect("/admin/authors");
    })
    .catch((err) => {
      console.log(err);
    })

}

exports.getBooks = (req, res, next) => {
  res.render('admin/books');
}