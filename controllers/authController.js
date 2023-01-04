const User = require('../models/user');

const bcrypt = require('bcryptjs');
const { session } = require('passport');

exports.getLogin = (req, res, next) => {
  const flashes = req.flash('error');
  let message = null;

  if (flashes.length > 0) {
    message = flashes[0];
  }

  res.render('auth/login', { errorMessage: message });
};



exports.postLogin = (err, req, res, next) => {
  if (err) {
    req.flash('error', err);
    req.session.save(() => {
      res.redirect('/auth/login');
    })
    return;
  }
};

exports.getSignup = (req, res, next) => {
  const flashes = req.flash('error');
  let message = null;

  if (flashes.length > 0) {
    message = flashes[0];
  }
  req.flash('error', "Email already in use");
  res.render('auth/signup', { errorMessage: message });
}

exports.postSignup = (req, res, next) => {

  const { username, password } = req.body;

  User.findOne({ email: username })
    .then(user => {
      if (user) {
        req.flash('error', "Email already in use");
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

exports.postLogout = (req, res, next) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/shop");
  });
};