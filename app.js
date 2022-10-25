const express = require('express');
const db = require('./models');
const { authorsRouter, booksRouter, publishersRouter } = require('./src/routes');
const {
  Books,
  Authors,
  Publishers,
  Publishers_Authors,
  Genres,
  Users,
  Customers
} = require('./models');
const { authRouter } = require('./src/routes/authRoutes');
const { verifyToken } = require('./src/middleware');
require('dotenv').config();

Authors.hasMany(Books);
Books.belongsTo(Authors);

Genres.hasMany(Books);
Books.belongsTo(Genres);

Publishers.hasMany(Books, { foreignKey: 'publisher_id' });
Books.belongsTo(Publishers);

Users.hasMany(Authors, { foreignKey: 'user_id' });
Authors.belongsTo(Users);

Users.hasMany(Publishers, { foreignKey: 'user_id' });
Publishers.belongsTo(Users);

Users.hasMany(Customers, { foreignKey: 'user_id' });
Customers.belongsTo(Users);

Publishers.belongsToMany(Authors, { through: Publishers_Authors, foreignKey: 'publisher_id' });
Authors.belongsToMany(Publishers, { through: Publishers_Authors });

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
