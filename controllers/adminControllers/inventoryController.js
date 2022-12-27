const Book = require('../../models/book');
const BookInStock = require('../../models/bookInStock');

const conditions = ['Like New', 'Good', 'Fair', 'Poor'];

exports.getInventory = (req, res, next) => {
  Book.find()
    .select('copies title')
    .sort('title')
    .then(catalogueBooks => {
      const bookArray = [];
      for (let book of catalogueBooks) {
        if (book.copies.length > 0) {
          bookArray.push(book);
        }
      }
      res.render("admin/inventory", { catalogueBooks: bookArray, backText: 'Admin', backHref: '/admin' });
    })
    .catch(err => {
      console.log(err);
    })
}

exports.getAddToInventory = (req, res, next) => {
  Book.find()
    .select('title')
    .sort('title')
    .then(catalogueBooks => {
      res.render("admin/addEditInventoryBook", { catalogueBooks, conditions, edit: false, copy: undefined, backText: 'Inventory', backHref: '/admin/inventory' })
    })
}

exports.postAddToInventory = (req, res, next) => {
  const {
    book,
    yearPublished,
    condition,
    price,
    imageURL,
    translator,
    editor,
    edition
  } = req.body;

  const copy = new BookInStock({
    book,
    yearPublished,
    condition,
    price,
    imageURL: imageURL.trim(),
    translator: translator.trim(),
    editor: editor.trim(),
    edition: edition.trim(),
  })

  copy.save()
    .then((copy) => {
      return Book.findOneAndUpdate({ _id: book }, {
        $push: {
          "copies": copy._id,
        }
      })
    })
    .then(() => {
      res.redirect("/admin/inventory");
    })
    .catch((err) => {
      console.log(err);
    })
}

exports.getInventoryBook = (req, res, next) => {
  Book.findById(req.params.bookId)
    .populate('copies')
    .then((book) => {
      res.render('admin/inventoryBook', { book, backText: 'Inventory', backHref: '/admin/inventory' });
    })
}

exports.getEditInventoryCopy = (req, res, next) => {

  const booksPromise = Book
    .find()
    .sort({ "title": 1 })
    .select('title');

  const copyPromise = BookInStock
    .findById(req.params.copyId);

  const backURL = req.url.slice(0, req.url.lastIndexOf('/'));

  Promise.all([booksPromise, copyPromise])
    .then(resultsArray => {
      const [catalogueBooks, copy] = resultsArray;
      res.render('admin/addEditInventoryBook', { conditions, catalogueBooks, copy, edit: true, backHref: '/admin' + backURL, backText: 'Book Copies' })
    })
    .catch(err => { console.log(err) });
}

exports.postEditInventoryCopy = (req, res, next) => {
  const {
    bookId,
    yearPublished,
    condition,
    price,
    imageURL,
    translator,
    editor,
    edition,
    copyId
  } = req.body

  BookInStock.findOneAndUpdate({ _id: copyId }, {
    yearPublished,
    condition,
    price,
    imageURL: imageURL.trim(),
    translator: translator.trim(),
    editor: editor.trim(),
    edition: edition.trim(),
  })
    .then((result) => {
      res.redirect("/admin/inventory/" + bookId);
    })
    .catch((err) => {
      console.log(err);
    })
}

exports.postEditCatalogueBookPage = (req, res, next) => {
  const {
    title,
    imageURL,
    author,
    genre,
    description,
    bookId
  } = req.body;

  Book.findOneAndUpdate({ _id: bookId }, {
    title: title.trim(),
    imageURL: imageURL.trim(),
    author,
    genre,
    description: description.trim(),
  })
    .then((result) => {
      res.redirect("/admin/book_catalogue/" + bookId);
    })
    .catch((err) => {
      console.log(err);
    })
}