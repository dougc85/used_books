const {
  userId,
} = require('../secrets');

const User = require('../models/user');
const Book = require('../models/book');


exports.getCart = (req, res, next) => {
  User
    .findById(userId)
    .populate({
      path: 'cart',
      populate: [{
        path: 'book',
        populate: [{
          path: 'author',
        }]
      }]
    })
    .then(user => {
      console.log(user.cart);
      res.render('cart', { user });
    })
}

exports.getAddToCart = (req, res, next) => {

  const bookId = req.query.bookId;

  const userPromise = User.findByIdAndUpdate(userId, {
    $push: {
      "cart": req.query.copyId,
    }
  })

  const bookPromise = Book.findByIdAndUpdate(bookId, {
    $pull: {
      "copies": req.query.copyId,
    }
  });

  Promise.all([userPromise, bookPromise]).then(() => {
    res.redirect('/cart');
  })
}

exports.getRemoveFromCart = (req, res, next) => {

  const bookId = req.query.bookId;

  const userPromise = User.findByIdAndUpdate(userId, {
    $pull: {
      "cart": req.query.copyId,
    }
  })

  const bookPromise = Book.findByIdAndUpdate(bookId, {
    $push: {
      "copies": req.query.copyId,
    }
  });

  Promise.all([userPromise, bookPromise]).then(() => {
    res.redirect('/cart');
  })
}