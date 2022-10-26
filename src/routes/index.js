const { authorsRouter } = require('./authorsRoutes');
const { booksRouter } = require('./booksRoutes');
const { publishersRouter } = require('./publishersRoutes');
const { authRouter } = require('./authRoutes');

module.exports = {
  authRouter,
  authorsRouter,
  booksRouter,
  publishersRouter
};
