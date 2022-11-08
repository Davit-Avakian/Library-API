const { authorsRouter } = require('./authorsRoutes');
const { booksRouter } = require('./booksRoutes');
const { publishersRouter } = require('./publishersRoutes');
const { authRouter } = require('./authRoutes');
const { genresRouter } = require('./generesRoutes');
const cors = require('cors');
const express = require('express');
const { verifyToken } = require('../middleware');

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

module.exports = app;
