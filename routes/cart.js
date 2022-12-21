const express = require('express');
const router = express.Router();

const {
  getAddToCart
} = require('../controllers/cartController');

router.get("/addtocart", getAddToCart);

module.exports = router;