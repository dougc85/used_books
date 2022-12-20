const express = require('express');
const {
  getIndex,
  getShopByTitle,
  getShopByAuthor,
  getShopByGenre,
} = require('../controllers/shopController');

const router = express.Router();


router.get("/", getIndex);

router.get("/title", getShopByTitle);
router.get("/author", getShopByAuthor);
router.get("/genre", getShopByGenre);

module.exports = router;