exports.internalServerError = (error) => {
  return { status: 'error', message: error };
};

exports.ROLES = {
  publisher: 'publisher',
  author: 'author',
  customer: 'customer'
};
