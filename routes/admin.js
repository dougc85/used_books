const express = require('express');
const {
  getIndex,
  getAuthors,
  getBooks,
  getAddAuthor,
  postAddAuthor,
  getAuthorPage,
  getEditAuthorPage,
  postEditAuthorPage,
} = require('../controllers/adminController');

const router = express.Router();

router.get("/", getIndex);


router.get("/authors", getAuthors);

router.get("/authors/add", getAddAuthor);
router.post("/authors/add", postAddAuthor);
router.get("/authors/:authorId", getAuthorPage);
router.get("/authors/:authorId/edit", getEditAuthorPage);
router.post("/authors/:authorId/edit", postEditAuthorPage);


router.get("/books", getBooks);

module.exports = router;