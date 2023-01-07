const Author = require('../../models/author');
const errorFunction = require('../../utilities/errorFunction');

exports.getAuthors = (req, res, next) => {

  Author
    .find()
    .select('firstname lastname')
    .sort({ "lastname": 1, "firstname": 1, "birthyear": 1 })
    .then((authors) => {
      res.render('admin/authors', { authors, backText: 'Admin', backHref: '/admin' });
    })
    .catch(errorFunction(next));
}

exports.getAddAuthor = (req, res, next) => {
  res.render('admin/addEditAuthor', { edit: false, backText: 'Authors', backHref: '/admin/authors' });
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
    .catch(errorFunction(next));
}

exports.getAuthorPage = (req, res, next) => {
  Author.findById(req.params.authorId)
    .populate("books", "title imageURL")
    .then((author) => {
      res.render('admin/authorPage', { author, backText: 'Authors', backHref: '/admin/authors' });
    })
    .catch(errorFunction(next));
}

exports.getEditAuthorPage = (req, res, next) => {
  Author.findById(req.params.authorId)
    .then((author) => {
      res.render('admin/addEditAuthor', { author, edit: true, backHref: '/admin' + req.url.slice(0, -5), backText: 'Author Info' });
    })
    .catch(errorFunction(next));
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
    .catch(errorFunction(next));
}