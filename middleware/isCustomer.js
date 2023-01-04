module.exports = (req, res, next) => {
  if (!req.user) {
    return res.redirect('/auth/login');
  };
  if (req.user.email === process.env.EMAIL_ADDRESS) {
    return res.redirect('/shop');
  }
  next();
}