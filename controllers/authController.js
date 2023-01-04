const User = require('../models/user');

const bcrypt = require('bcryptjs');

exports.getLogin = (req, res, next) => {
  res.render('auth/login');
};

exports.postLogin = (req, res, next) => {

};

exports.getSignup = (req, res, next) => {
  res.render('auth/signup');
}

exports.postSignup = (req, res, next) => {

  const { username, password } = req.body;

  User.findOne({ email: username })
    .then(user => {
      if (user) {
        res.redirect('/auth/signup');
      } else {
        bcrypt.hash(password, 12)
          .then(hashedPW => {
            const newUser = new User({
              email: username,
              password: hashedPW,
              orders: [],
              cart: [],
            });

            return newUser.save()
          })
          .then(newUser => {
            req.login(newUser, function (err) {
              if (err) { return next(err); }
              res.redirect('/shop');
            });
          })
      }
    })
}