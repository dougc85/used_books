const User = require('../models/user');
const Book = require('../models/book');
const BookInStock = require('../models/bookInStock');
const Order = require('../models/order');

const errorFunction = require('../utilities/errorFunction');


exports.getCart = (req, res, next) => {
  User
    .findById(req.user._id)
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
      res.render('cart', { user });
    })
    .catch(errorFunction(next));
}

exports.getAddToCart = (req, res, next) => {

  const bookId = req.query.bookId;

  const userPromise = User.findByIdAndUpdate(req.user._id, {
    $push: {
      "cart": req.query.copyId,
    }
  })

  const bookPromise = Book.findByIdAndUpdate(bookId, {
    $pull: {
      "copies": req.query.copyId,
    }
  });

  Promise.all([userPromise, bookPromise])
    .then(() => {
      res.redirect('/cart');
    })
    .catch(errorFunction(next));
}

exports.getRemoveFromCart = (req, res, next) => {

  const bookId = req.query.bookId;

  const userPromise = User.findByIdAndUpdate(req.user._id, {
    $pull: {
      "cart": req.query.copyId,
    }
  })

  const bookPromise = Book.findByIdAndUpdate(bookId, {
    $push: {
      "copies": req.query.copyId,
    }
  });

  Promise.all([userPromise, bookPromise])
    .then(() => {
      res.redirect('/cart');
    })
    .catch(errorFunction(next));
}

exports.postPlaceOrder = (req, res, next) => {

  const copyPromises = [];

  for (key in req.body) {
    if (key !== 'total') {
      const copy = req.body[key];
      const copyPromise = BookInStock.findOne({ _id: copy });
      copyPromises.push(copyPromise);
    }
  }

  Promise.all(copyPromises)
    .then(copies => {

      const promises = [];
      const copyIds = [];
      const purchasedBooks = [];

      for (copy of copies) {

        copyIds.push(copy._id);

        const {
          book,
          price,
          imageURL,
          yearPublished,
          condition,
          translator,
          editor,
          edition,
        } = copy;

        const newCopyObject = {
          book,
          price,
          imageURL,
          yearPublished,
          condition,
          translator,
          editor,
          edition,
        };

        const objForInsert = {};

        for (key in newCopyObject) {
          if (newCopyObject[key]) {
            objForInsert[key] = newCopyObject[key];
          }
        };

        purchasedBooks.push(objForInsert);
        const deletePromise = BookInStock.findByIdAndDelete(copy);
        promises.push(deletePromise);
      }

      const orderDate = new Date();

      const order = new Order({
        user: req.user._id,
        date: orderDate,
        total: +req.body.total,
        purchasedBooks,
      });

      const orderPromise = order.save();
      promises.push(orderPromise);

      Promise.all(promises)
        .then((resultsArray) => {
          const order = resultsArray.pop();

          return User.findByIdAndUpdate(req.user._id, {
            $pull: {
              "cart": { $in: copyIds }
            },
            $push: {
              "orders": {
                order: order._id,
                date: orderDate,
                total: +req.body.total,
              },
            }
          })
        })
        .then(() => {
          res.redirect('/orders')
        })
        .catch(errorFunction(next));
    })
    .catch(errorFunction(next));
}