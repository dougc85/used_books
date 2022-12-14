const express = require('express');
const router = express.Router();
const isLoggedIn = require('../middleware/isLoggedIn');

const passport = require('passport');

const {
  getLogin,
  postLogin,
  getSignup,
  postSignup,
  postLogout,
  getPasswordReset,
  postPasswordReset,
  getNewPassword,
  postNewPassword,
} = require('../controllers/authController');

router.get("/login", isLoggedIn, getLogin);
router.post("/login", isLoggedIn, passport.authenticate('local', { successRedirect: '/shop' }), postLogin);
router.get("/passwordreset", isLoggedIn, getPasswordReset);
router.post("/passwordreset", isLoggedIn, postPasswordReset)
router.get("/newpassword/:token", getNewPassword);
router.post("/newpassword/:token", postNewPassword);

router.get("/signup", isLoggedIn, getSignup);
router.post("/signup", isLoggedIn, postSignup);

router.post("/logout", postLogout);

module.exports = router;