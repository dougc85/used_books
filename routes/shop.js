const express = require('express');
const {
  getIndex,
  getShopByTitle,
} = require('../controllers/shopController');

const router = express.Router();


router.get("/", getIndex);

router.get("/title", getShopByTitle);

module.exports = router;