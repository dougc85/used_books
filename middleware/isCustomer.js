module.exports = (req, res, next) => {
  if (!req.user) {
    return res.redirect('/auth/login');
  };
  if (req.user.email === "usedbooks.dougcarter@gmail.com") {
    return res.redirect('/shop');
  }
  next();
}