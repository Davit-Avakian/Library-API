const express = require('express');
const { authorsRouter, booksRouter, publishersRouter } = require('./routes');

const app = express();

app.use(express.json());

// books route
app.use('/books', booksRouter);

// authors route
app.use('/authors', authorsRouter);

// publishers route
app.use('/publishers', publishersRouter);

// error handler
// eslint-disable-next-line no-unused-vars
app.use(function (err, req, res, next) {
  res.status(err.status).json({ status: 'error', message: err.message });
});

// eslint-disable-next-line
app.listen(process.env.APP_PORT);
