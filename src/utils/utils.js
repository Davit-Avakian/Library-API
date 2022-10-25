exports.internalServerError = (error) => {
  return { status: 'zz', message: error };
};
