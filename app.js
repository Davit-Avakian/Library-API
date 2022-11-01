const express = require('express');
const db = require('./models');
const { authRouter, authorsRouter, booksRouter, publishersRouter } = require('./src/routes');
const { verifyToken } = require('./src/middleware');
const { Authors, Publishers, Publishers_Authors } = require('./models');
require('dotenv').config();

// many to many relationship for publishers and authors
Publishers.belongsToMany(Authors, { through: Publishers_Authors });
Authors.belongsToMany(Publishers, { through: Publishers_Authors });

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

db.sequelize.sync({ logging: false, alter: true }).then(() => {
  app.listen(process.env.APP_PORT);
});

module.exports = app;
