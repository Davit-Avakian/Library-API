const express = require('express');

const db = require('#models');
const {
  authRouter,
  authorsRouter,
  booksRouter,
  publishersRouter,
  genresRouter
} = require('#routes');
const { verifyToken } = require('#middleware');
const { Authors, Publishers, Publishers_Authors } = require('#models');

const cors = require('cors');
require('dotenv').config();

// many to many relationship for publishers and authors
Publishers.belongsToMany(Authors, { through: Publishers_Authors });
Authors.belongsToMany(Publishers, { through: Publishers_Authors });

// initialize app
const app = express();

app.use(express.json());
app.use(cors());

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

// genres route
app.use('/genres', genresRouter);

// error handler
// eslint-disable-next-line no-unused-vars
app.use(function (err, req, res, next) {
  res.status(err.status).json({ status: 'error', message: err.message });
});

db.sequelize.sync({ logging: false, alter: true }).then(() => {
  app.listen(process.env.APP_PORT);
});

module.exports = app;
