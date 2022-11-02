const Book = require('../../models/book');
const BookInStock = require('../../models/bookInStock');

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
      res.render("admin/inventory", { catalogueBooks: bookArray });
    })
    .catch(err => {
      console.log(err);
    })
}

exports.getAddToInventory = (req, res, next) => {
  const conditions = ['Like New', 'Good', 'Fair', 'Poor'];
  Book.find()
    .select('title')
    .sort('title')
    .then(catalogueBooks => {
      res.render("admin/addEditInventoryBook", { catalogueBooks, conditions, edit: false })
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

}

exports.getEditInventoryCopy = (req, res, next) => {

}

exports.postEditInventoryCopy = (req, res, next) => {

}