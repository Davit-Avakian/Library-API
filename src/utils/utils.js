exports.internalServerError = (message) => {
  const error = new Error();

  error.status = 500;
  error.message = message;

  return error;
};

exports.badRequestError = (message) => {
  const error = new Error();

  error.status = 404;
  error.message = message;

  return error;
};

exports.unAuthorizedError = (message) => {
  const error = new Error();

  error.status = 401;
  error.message = message;

  return error;
};

exports.ROLES = {
  publisher: 'publisher',
  author: 'author',
  customer: 'customer'
};
