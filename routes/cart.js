const express = require('express');
const router = express.Router();

const {
  getCart,
  getAddToCart
} = require('../controllers/cartController');

router.get("/", getCart);
router.get("/addtocart", getAddToCart);

module.exports = router;