const express = require('express');
const router = express.Router();

const {
  getCart,
  getAddToCart,
  getRemoveFromCart,
  postPlaceOrder,
} = require('../controllers/cartController');

router.get("/", getCart);
router.get("/addtocart", getAddToCart);
router.get("/removefromcart", getRemoveFromCart);
router.post("/placeorder", postPlaceOrder);

module.exports = router;