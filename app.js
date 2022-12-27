const express = require('express');
const mongoose = require('mongoose');
const compression = require("compression");
const helmet = require("helmet");
// const secrets = require('./secrets');

const get404 = require('./controllers/404Controller');
const getIndex = require('./controllers/indexController');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const cartRoutes = require('./routes/cart');
const ordersRoutes = require('./routes/orders');

const app = express();
const mongoDB = process.env.MONGODB_URI;

app.use(helmet());
app.use(
  helmet.contentSecurityPolicy({
    useDefaults: true,
    directives: {
      "img-src": ["'self'", "https: data:"]
    }
  })
)
app.use(compression());

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", getIndex);
app.use("/admin", adminRoutes);
app.use("/shop", shopRoutes);
app.use("/cart", cartRoutes);
app.use("/orders", ordersRoutes);
app.use("/", get404);



mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    let port = process.env.PORT || '3000';
    app.listen(port);
  })
  .catch((err) => {
    console.log('Cannot connect to DB');
  })

