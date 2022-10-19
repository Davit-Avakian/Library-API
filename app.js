const express = require('express');
const { authorsRouter } = require('./routes/authorsRoutes');
const { booksRouter } = require('./routes/booksRoutes');
const { publishersRouter } = require('./routes/publishersRoutes');

const app = express();

app.use(express.json());

// books route
app.use('/books', booksRouter);

// authors route
app.use('/authors', authorsRouter);

// publishers route
app.use('/publishers', publishersRouter);

// 404 not found
app.use(function (req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
// eslint-disable-next-line no-unused-vars
app.use(function (err, req, res, next) {
  res.status(err.status).json({ status: 'error', message: err.message });
});

app.listen(5000);
