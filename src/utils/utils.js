exports.internalServerError = (error) => {
  return { status: 'zz', message: error };
};

exports.ROLES = {
  publisher: 'publisher',
  author: 'author',
  customer: 'customer'
};
