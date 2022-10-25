const express = require('express');
const db = require('./models');
const { authorsRouter, booksRouter, publishersRouter } = require('./src/routes');
const { Books, Authors, Publishers, Publishers_Authors, Genres } = require('./models');

Authors.hasMany(Books);
Books.belongsTo(Authors);

Genres.hasMany(Books);
Books.belongsTo(Genres);

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

// error handler
// eslint-disable-next-line no-unused-vars
app.use(function (err, req, res, next) {
  res.status(err.status).json({ status: 'error', message: err.message });
});

db.sequelize.sync({ logging: false, alter: true }).then(() => {
  app.listen(process.env.APP_PORT);
});
