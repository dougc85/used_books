const express = require('express');
const {
  getIndex,
  getShopByTitle,
  getShopBookPage,
  getShopByAuthor,
  getShopByOneAuthor,
  getShopByGenre,
  getShopByOneGenre,
} = require('../controllers/shopController');

const router = express.Router();


router.get("/", getIndex);

router.get("/title", getShopByTitle);
router.get("/title/:bookId", getShopBookPage);

router.get("/author", getShopByAuthor);
router.get("/author/:authorId", getShopByOneAuthor);

router.get("/genre", getShopByGenre);
router.get("/genre/:genreId", getShopByOneGenre);

module.exports = router;