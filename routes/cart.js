const isCustomer = require('../middleware/isCustomer');

const express = require('express');
const router = express.Router();

const {
  getCart,
  getAddToCart,
  getRemoveFromCart,
  postPlaceOrder,
} = require('../controllers/cartController');

router.get("/", getCart);
router.get("/addtocart", isCustomer, getAddToCart);
router.get("/removefromcart", isCustomer, getRemoveFromCart);
router.post("/placeorder", isCustomer, postPlaceOrder);

module.exports = router;