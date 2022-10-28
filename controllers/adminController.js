exports.getIndex = (req, res, next) => {
  res.render('admin/adminIndex');
}

exports.getAuthors = (req, res, next) => {
  res.render('admin/authors');
}

exports.getAddAuthor = (req, res, next) => {
  res.render('admin/addAuthor');
}

exports.getBooks = (req, res, next) => {
  res.render('admin/books');
}