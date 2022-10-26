const express = require('express');
const db = require('#models');
const { authRouter, authorsRouter, booksRouter, publishersRouter } = require('#routes');
const { verifyToken } = require('#middleware');
require('dotenv').config();

// initialize app
const app = express();

app.use(express.json());

// auth route
app.use('/auth', authRouter);

// check if token is valid
app.use(verifyToken);

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

db.sequelize.sync({ logging: false, force: true }).then(() => {
  app.listen(process.env.APP_PORT);
});
