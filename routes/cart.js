const express = require('express');
const router = express.Router();

const {
  getCart,
  getAddToCart,
  getRemoveFromCart,
} = require('../controllers/cartController');

router.get("/", getCart);
router.get("/addtocart", getAddToCart);
router.get("/removefromcart", getRemoveFromCart);

module.exports = router;