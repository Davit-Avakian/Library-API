const express = require('express');
const db = require('./models');
const { authorsRouter } = require('./src/routes/authorsRoutes');
const { booksRouter } = require('./src/routes/booksRoutes');
const { publishersRouter } = require('./src/routes/publishersRoutes');
const { Books, Authors, Publishers, Publishers_Authors } = require('./models');

Authors.hasMany(Books);
Books.belongsTo(Authors);

Publishers.hasMany(Books, { foreignKey: 'publisher_id' });
Books.belongsTo(Publishers);

Publishers.belongsToMany(Authors, { through: Publishers_Authors, foreignKey: 'publisher_id' });
Authors.belongsToMany(Publishers, { through: Publishers_Authors });

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

db.sequelize.sync({ logging: false, alter: true }).then(() => {
  app.listen(5000);
});
