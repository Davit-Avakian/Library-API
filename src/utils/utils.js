exports.internalServerError = (message) => {
  const error = {};

  error.status = 'server error';
  error.message = message;

  return error;
};

exports.badRequestError = (message) => {
  const error = {};

  error.status = 'bad request';
  error.message = message;

  return error;
};

exports.unAuthorizedError = (message) => {
  const error = {};

  error.status = 'unauthorized error';
  error.message = message;

  return error;
};

exports.ROLES = {
  publisher: 'publisher',
  author: 'author',
  customer: 'customer'
};
