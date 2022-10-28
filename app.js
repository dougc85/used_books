const express = require('express');
const mongoose = require('mongoose');
const secrets = require('./secrets');

const get404 = require('./controllers/404Controller');
const getIndex = require('./controllers/indexController');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

const app = express();
const mongoDB = secrets.mongoURI;

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", getIndex);
app.use("/admin", adminRoutes);
app.use("/shop", shopRoutes);
app.use("/", get404);

mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    app.listen(3000);
  })
  .catch((err) => {
    console.log('Cannot connect to DB');
  })

