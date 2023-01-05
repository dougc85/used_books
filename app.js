const express = require('express');
const mongoose = require('mongoose');
const compression = require("compression");
require('dotenv').config();
const session = require('express-session');
const MongoStore = require('connect-mongo');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const bcrypt = require('bcryptjs');
const flash = require('connect-flash');
const isAuth = require('./middleware/isAdmin');
const isCustomer = require('./middleware/isCustomer');
// const secrets = require('./secrets');

const User = require('./models/user');
const get404 = require('./controllers/404Controller');
const getIndex = require('./controllers/indexController');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const cartRoutes = require('./routes/cart');
const ordersRoutes = require('./routes/orders');
const authRoutes = require('./routes/auth');

const app = express();
const mongoDB = process.env.MONGODB_URI;

const sessionStore = new MongoStore({
  mongoUrl: mongoDB,
  collectionName: 'sessions',
})

function validatePassword(password, user) {

}

passport.use(new LocalStrategy(
  function (username, password, cb) {

    username = username.toLowerCase().trim();

    User.findOne({ email: username })
      .then((user) => {
        if (!user) {
          return cb(`There is no account associated with the email ${username}`, false)
        }
        bcrypt.compare(password, user.password)
          .then(passwordIsValid => {
            if (passwordIsValid) {
              return cb(null, user);
            } else {
              return cb('Invalid password', false);
            }
          })
      })
  }
));

passport.serializeUser(function (user, cb) {
  cb(null, user._id);
});
passport.deserializeUser(function (id, cb) {
  User.findById(id, function (err, user) {
    if (err) {
      return cb(err);
    }
    cb(null, user);
  })
});

app.use(session({
  secret: process.env.STORE_SECRET,
  resave: false,
  saveUninitialized: true,
  store: sessionStore,
}));

app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

app.use(compression());

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  res.locals.adminEmail = process.env.EMAIL_ADDRESS;
  next();
})

app.get("/", getIndex);
app.use("/admin", isAuth, adminRoutes);
app.use("/shop", shopRoutes);
app.use("/cart", isCustomer, cartRoutes);
app.use("/orders", isCustomer, ordersRoutes);
app.use("/auth", authRoutes);
app.use("/", get404);



mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    let port = process.env.PORT || '3000';
    app.listen(port);
  })
  .catch((err) => {
    console.log('Cannot connect to DB');
  })

