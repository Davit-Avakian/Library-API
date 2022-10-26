const express = require('express');
const db = require('#models');
const { authRouter, authorsRouter, booksRouter, publishersRouter } = require('#routes');
const {
  Books,
  Authors,
  Publishers,
  Publishers_Authors,
  Genres,
  Profile,
  Customers
} = require('#models');
const { verifyToken } = require('#middleware');
require('dotenv').config();

// DB relationships
Authors.hasMany(Books);
Books.belongsTo(Authors);

Genres.hasMany(Books);
Books.belongsTo(Genres);

Publishers.hasMany(Books, { foreignKey: 'publisher_id' });
Books.belongsTo(Publishers);

Profile.hasMany(Authors);
Authors.belongsTo(Profile);

Profile.hasMany(Publishers);
Publishers.belongsTo(Profile);

Profile.hasMany(Customers);
Customers.belongsTo(Profile);

Publishers.belongsToMany(Authors, { through: Publishers_Authors, foreignKey: 'publisher_id' });
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
