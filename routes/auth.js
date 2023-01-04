const express = require('express');
const router = express.Router();

const passport = require('passport');

const {
  getLogin,
  postLogin,
  getSignup,
  postSignup,
} = require('../controllers/authController');

const authenticate = () => passport.authenticate('local', { failureRedirect: '/auth/login' });

const afterLogin = (err, req, res, next) => {
  if (err) next(err);
  res.redirect('/shop');
};

router.get("/login", getLogin);
router.post("/login", postLogin);

router.get("/signup", getSignup);
router.post("/signup", postSignup);

module.exports = router;