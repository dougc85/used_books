

module.exports = function errorFunction(next) {
  return function (err) {
    const error = new Error(err);
    error.httpStatusCode = 500;
    return next(error);
  }
}