// const {
//   userId,
// } = require('../secrets');

const userID = process.env.USER_ID;

const User = require('../models/user');
const Order = require('../models/order');

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
}