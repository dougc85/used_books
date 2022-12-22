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
        }
      }
    })
    .then((user) => {
      console.log(user.orders[2].order.purchasedBooks);
      res.render('orders/orders')
    })
}