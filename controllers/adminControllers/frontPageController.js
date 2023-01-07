const Book = require('../../models/book');
const FrontPage = require('../../models/frontPage');
const Author = require('../../models/author');

const errorFunction = require('../../utilities/errorFunction');

exports.getFrontPage = (req, res, next) => {
  FrontPage.findOne().populate("suggestedBooks").populate("featuredAuthor")
    .then(({ suggestedBooks, featuredAuthor }) => {
      res.render('admin/frontPageAdmin', { backText: 'Admin', backHref: '/admin', suggestedBooks, featuredAuthor });
    })
    .catch(errorFunction(next));
}

exports.getEditPicksFront = (req, res, next) => {
  const frontPromise = FrontPage.findOne().exec();

  const bookPromise =
    Book
      .find()
      .select('title imageURL')
      .sort({ "title": 1 })
      .exec();

  Promise.all([frontPromise, bookPromise])
    .then(([frontPage, books]) => {
      res.render('admin/editPicks', { books, backText: 'Front Page Admin', backHref: '/admin/frontpage', oldPicks: frontPage.suggestedBooks, emphasizeFour: false });
    })
    .catch(errorFunction(next));
}

exports.postEditPicksFront = (req, res, next) => {

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
      .catch(errorFunction(next));
  } else {
    const frontPromise = FrontPage.findOne().exec();

    const bookPromise =
      Book
        .find()
        .select('title imageURL')
        .sort({ "title": 1 })
        .exec();

    Promise.all([frontPromise, bookPromise])
      .then(([frontPage, books]) => {
        res.render('admin/editPicks', { books, backText: 'Front Page Admin', backHref: '/admin/frontpage', oldPicks: frontPage.suggestedBooks, emphasizeFour: true });
      })
      .catch(errorFunction(next));
  }
}

exports.getEditAuthorFront = (req, res, next) => {
  const frontPromise = FrontPage.findOne().exec();

  const authorPromise =
    Author
      .find()
      .select('firstname lastname birthyear deathyear')
      .sort({ "lastname": 1 })
      .exec();

  Promise.all([frontPromise, authorPromise])
    .then(([frontPage, authors]) => {
      res.render('admin/pickAuthor', { authors, backText: 'Front Page Admin', backHref: '/admin/frontpage', oldAuthor: frontPage.featuredAuthor });
    })
    .catch(errorFunction(next));
}

exports.postEditAuthorFront = (req, res, next) => {
  FrontPage.findOne()
    .then((frontPage) => {
      frontPage.featuredAuthor = req.body.featuredAuthor;
      return frontPage.save();
    })
    .then(() => {
      res.redirect('/admin/frontpage');
    })
    .catch(errorFunction(next));
}