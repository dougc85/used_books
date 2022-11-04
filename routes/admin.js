const express = require('express');

const {
  getInventory,
  getAddToInventory,
  postAddToInventory,
  getInventoryBook,
  getEditInventoryCopy,
  postEditInventoryCopy,
} = require('../controllers/adminControllers/inventoryController');

const {
  getAuthors,
  getAddAuthor,
  postAddAuthor,
  getAuthorPage,
  getEditAuthorPage,
  postEditAuthorPage,
} = require('../controllers/adminControllers/authorController');

const {
  getGenres,
  getAddGenre,
  postAddGenre,
  getEditGenre,
  postEditGenre,
} = require('../controllers/adminControllers/genreController');

const {
  getBookCatalogue,
  getAddBookToCatalogue,
  postAddBookToCatalogue,
  getCatalogueBookPage,
  getEditCatalogueBookPage,
  postEditCatalogueBookPage,
} = require('../controllers/adminControllers/catalogueController');

const router = express.Router();

router.get("/", (req, res, next) => {
  res.render('admin/adminIndex');
});


router.get("/inventory", getInventory);

router.get("/inventory/add", getAddToInventory);
router.post("/inventory/add", postAddToInventory);
router.get("/inventory/:bookId", getInventoryBook);
router.get("/inventory/:bookId/:copyId", getEditInventoryCopy);
router.post("/inventory/:bookId/:copyId", postEditInventoryCopy)


router.get("/authors", getAuthors);

router.get("/authors/add", getAddAuthor);
router.post("/authors/add", postAddAuthor);
router.get("/authors/:authorId", getAuthorPage);
router.get("/authors/:authorId/edit", getEditAuthorPage);
router.post("/authors/:authorId/edit", postEditAuthorPage);



router.get("/book_catalogue", getBookCatalogue);

router.get("/book_catalogue/add", getAddBookToCatalogue);
router.post("/book_catalogue/add", postAddBookToCatalogue);
router.get("/book_catalogue/:bookId", getCatalogueBookPage);
router.get("/book_catalogue/:bookId/edit", getEditCatalogueBookPage)
router.post("/book_catalogue/:bookId/edit", postEditCatalogueBookPage)


router.get("/genres", getGenres);

router.get("/genres/add", getAddGenre);
router.post("/genres/add", postAddGenre);
router.get("/genres/:genreId/edit", getEditGenre);
router.post("/genres/:genreId/edit", postEditGenre);

module.exports = router;