const User = require('../models/user');
const bcrypt = require('bcryptjs');
const { session } = require('passport');
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_ADDRESS,
    pass: process.env.EMAIL_PASSWORD,
  }
});

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

exports.getPasswordReset = (req, res, next) => {

  const errorFlashes = req.flash('error');
  const successFlashes = req.flash('success');

  let message = null;
  let type = null;

  if (errorFlashes.length > 0) {
    message = errorFlashes[0];
    type = 'error';
  } else if (successFlashes.length > 0) {
    message = successFlashes[0];
    type = 'success';
  }

  res.render('auth/passwordreset', { message });
}

exports.postPasswordReset = (req, res, next) => {

}

exports.getSignup = (req, res, next) => {

  const flashes = req.flash('error');
  let message = null;

  if (flashes.length > 0) {
    message = flashes[0];
  }
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