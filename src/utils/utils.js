exports.internalServerError = (error) => {
  return { status: 'error', message: error };
};
