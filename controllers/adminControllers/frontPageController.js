const Book = require('../../models/book');
const FrontPage = require('../../models/frontPage');
const Author = require('../../models/author');

exports.getFrontPage = (req, res, next) => {
  res.render('admin/frontPageAdmin', { backText: 'Admin', backHref: '/admin' });
}

exports.getEditPicksFront = (req, res, next) => {
  const frontPromise = FrontPage.findOne().exec();

  const bookPromise =
    Book
      .find()
      .select('title imageURL')
      .sort({ "title": 1 })
      .exec();

  Promise.all([frontPromise, bookPromise]).then(([frontPage, books]) => {
    res.render('admin/editPicks', { books, backText: 'Front Page Admin', backHref: '/admin/frontpage', oldPicks: frontPage.suggestedBooks });
  });
}

exports.postEditPicksFront = (req, res, next) => {
  console.log(req.body);

  if (Object.keys(req.body).length === 4) {
    FrontPage.findOne()
      .then((frontPage) => {
        frontPage.suggestedBooks = Object.keys(req.body).map(bookNumber => {
          return req.body[bookNumber];
        })
        return frontPage.save();
      })
      .then(() => {
        res.redirect('/admin/frontpage');
      })
  } else {
    res.redirect('/admin/frontpage/edit_picks');
  }
}

exports.getEditAuthorFront = (req, res, next) => {

}

exports.postEditAuthorFront = (req, res, next) => {

}