const { authorsRouter } = require('./authorsRoutes');
const { booksRouter } = require('./booksRoutes');
const { publishersRouter } = require('./publishersRoutes');
const { authRouter } = require('./authRoutes');
const { genresRouter } = require('./generesRoutes');

module.exports = {
  authRouter,
  authorsRouter,
  booksRouter,
  publishersRouter,
  genresRouter
};
