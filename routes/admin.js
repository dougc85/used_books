const express = require('express');
const {
  getIndex,
  getAuthors,
  getBookCatalogue,
  getAddAuthor,
  postAddAuthor,
  getAuthorPage,
  getEditAuthorPage,
  postEditAuthorPage,
  getGenres,
  getAddGenre,
  postAddGenre,
  getEditGenre,
  postEditGenre,
} = require('../controllers/adminController');

const router = express.Router();

router.get("/", getIndex);


router.get("/authors", getAuthors);

router.get("/authors/add", getAddAuthor);
router.post("/authors/add", postAddAuthor);
router.get("/authors/:authorId", getAuthorPage);
router.get("/authors/:authorId/edit", getEditAuthorPage);
router.post("/authors/:authorId/edit", postEditAuthorPage);


router.get("/bookCatalogue", getBookCatalogue);

router.get("/genres", getGenres);
router.get("/genres/add", getAddGenre);
router.post("/genres/add", postAddGenre);
router.get("/genres/:genreId/edit", getEditGenre);
router.post("/genres/:genreId/edit", postEditGenre);

module.exports = router;