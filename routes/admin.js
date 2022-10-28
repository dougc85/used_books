const express = require('express');
const { getIndex, getAuthors, getBooks, getAddAuthor } = require('../controllers/adminController');

const router = express.Router();

router.get("/", getIndex);

router.get("/authors", getAuthors);
router.get("/authors/add", getAddAuthor);

router.get("books", getBooks);

module.exports = router;