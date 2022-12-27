const express = require('express');
const router = express.Router();

const {
  getOrders,
  getOrder
} = require('../controllers/ordersController');

router.get("/", getOrders);
router.get("/:orderId", getOrder)


module.exports = router;