const User = require('../models/user');
const Order = require('../models/order');

const errorFunction = require('../utilities/errorFunction');

exports.getOrders = (req, res, next) => {
  User
    .findOne({ _id: req.user._id })
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
    .catch(errorFunction(next));
}

exports.getOrder = (req, res, next) => {
  Order
    .findOne({ _id: req.params.orderId })
    .populate({
      path: 'purchasedBooks',
      populate: {
        path: 'book',
        select: 'title author'
      }
    })
    .then((order) => {
      res.render('orders/order', { order })
    })
    .catch(errorFunction(next));
}