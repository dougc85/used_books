const {
  userId,
} = require('../secrets');

const User = require('../models/user');
const Book = require('../models/book');

exports.getOrders = (req, res, next) => {
  User
    .findOne({ _id: userId })
    .populate({
      path: 'orders',
      populate: {
        path: 'order',
        populate: {
          path: 'purchasedBooks',
          populate: {
            path: 'book',
            select: 'title'
          }
        }
      }
    })
    .then((user) => {
      res.render('orders/orders', { orders: user.orders })
    })
}