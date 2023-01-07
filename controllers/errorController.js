exports.get404 = (req, res, next) => {
  res.send('404 - Page Not Found');
}

exports.get500 = (req, res, next) => {
  res.send(`
    <h1>
    500 - Server Error
    </h1>
    <p>
    Please retry your request.  If the problem persists, try again later.
    </p>
  `)
}