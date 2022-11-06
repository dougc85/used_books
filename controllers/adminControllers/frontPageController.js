const Book = require('../../models/book');

exports.getFrontPage = (req, res, next) => {
  res.render('admin/frontPageAdmin', { backText: 'Admin', backHref: '/admin' });
}

exports.getEditPicksFront = (req, res, next) => {
  Book
    .find()
    .select('title imageURL')
    .sort({ "title": 1 })
    .then((books) => {
      res.render('admin/editPicks', { books, backText: 'Front Page Admin', backHref: '/admin/frontpage' });
    })
    ;
}

exports.postEditPicksFront = (req, res, next) => {

}

exports.getEditAuthorFront = (req, res, next) => {

}

exports.postEditAuthorFront = (req, res, next) => {

}