const User = require('../models/user');
const bcrypt = require('bcryptjs');
const { session } = require('passport');
const nodemailer = require('nodemailer');
const crypto = require('crypto');

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

  res.render('auth/passwordReset', { message, type });
}

exports.postPasswordReset = (req, res, next) => {

  let { email } = req.body;

  email = email.toLowerCase().trim();

  User.findOne({ email })
    .then(user => {
      if (!user) {
        req.flash('error', `The email '${email}' was not found`);
        req.session.save(() => {
          res.redirect('/auth/passwordreset');
        })

        return;
      }

      crypto.randomBytes(32, (err, buffer) => {
        if (err) {
          console.log(err);
          res.redirect('/auth/passwordreset');
          return;
        }
        const token = buffer.toString('hex');
        user.pwResetToken = token;
        user.pwResetTokenExp = Date.now() + 3600000;
        user.save()
          .then(result => {
            const mailOptions = {
              from: process.env.EMAIL_ADDRESS,
              to: email,
              subject: "Password Reset for Doug's Used Books",
              html: `
              <p>You have requested a Password Reset from Doug's Used Books</p>
              <p>Click the link below to proceed</p>
              <a href="${process.env.APP_URL}/auth/newpassword/${token}">Reset Password</a>
            `
            }
            transporter.sendMail(mailOptions, function (err, info) {
              if (err) {
                console.log(err);
                req.flash('error', `A network error occurred.  Please try again.`);
                req.session.save(() => {
                  res.redirect('/auth/passwordreset');
                })
                return;
              }
              req.flash('success', `Success! Check your email (or spam folder) for reset instructions.`);
              req.session.save(() => {
                res.redirect('/auth/passwordreset');
              })
            })
          })
      })
    })
}

exports.getNewPassword = (req, res, next) => {

  User.findOne({ pwResetToken: req.params.token })
    .then(user => {
      if (!user) {
        res.redirect('/auth/login');
        return;
      }
      if (Date.now() > user.pwResetTokenExp) {
        req.flash('error', `Password reset email link expired 1 hour after request. Try again.`);
        res.redirect('/auth/passwordreset');
      }

      const flashes = req.flash('error');

      let message = null;

      if (flashes.length > 0) {
        message = flashes[0];
      }
      res.render('auth/newPassword', { message, token: req.params.token });
    })
}

exports.postNewPassword = (req, res, next) => {
  const { password1, password2 } = req.body;

  if (password1 !== password2) {
    req.flash('error', `Entered passwords do not match. Try again.`);
    req.session.save(() => {
      res.redirect(`/auth/newpassword/${req.params.token}`);
      return;
    })
  }
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

  let { username, password } = req.body;

  username = username.toLowerCase().trim();

  User.findOne({ email: username })
    .then(user => {
      if (user) {
        req.flash('error', "Email already in use");
        req.session.save(() => {
          res.redirect('/auth/signup');
        })
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