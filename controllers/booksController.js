const client = require('../config/connection');
const { internalServerError, getDataByField } = require('../utils/utils');

exports.getAllBooks = async (req, res) => {
  try {
    const { rows } = await client.query('SELECT * FROM books');

    res.status(200).json({ status: 'success', data: rows });
  } catch ({ message }) {
    res.status(500).json(internalServerError(message));
  }
};

exports.getBookById = async (req, res) => {
  try {
    const { bookId } = req.params;

    const data = await getDataByField('books', 'id', bookId);

    res.status(200).json({ status: 'success', data });
  } catch ({ message }) {
    res.status(500).json(internalServerError(message));
  }
};

exports.getBookByGenre = async (req, res) => {
  try {
    const { genre } = req.params;

    const data = await getDataByField('books', 'genre', genre);

    res.status(200).json({ status: 'success', data });
  } catch ({ message }) {
    res.status(500).json(internalServerError(message));
  }
};

exports.getBooksByAuthorId = async (req, res) => {
  try {
    const { authorId } = req.params;

    const { rows } = await client.query('SELECT * FROM books WHERE author_id = $1 ORDER BY genre', [
      authorId
    ]);

    res.status(200).json({ status: 'success', count: rows.length, data: rows });
  } catch ({ message }) {
    res.status(500).json(internalServerError(message));
  }
};

exports.getAuthorBooksByGenre = async (req, res) => {
  try {
    const { authorId, genre } = req.params;

    const { rows } = await client.query('SELECT * FROM books WHERE author_id = $1 AND genre = $2', [
      authorId,
      genre
    ]);

    res.status(200).json({ status: 'success', data: rows });
  } catch ({ message }) {
    res.status(500).json(internalServerError(message));
  }
};

exports.getBooksByPublisherId = async (req, res) => {
  try {
    const { publisherId } = req.params;

    const data = await getDataByField('books', 'publisher_id', publisherId);

    res.status(200).json({ status: 'success', data });
  } catch ({ message }) {
    res.status(500).json(internalServerError(message));
  }
};

exports.addNewBook = async (req, res) => {
  try {
    const { title, authorId, publisherId, publishDate, rating, coAuthorId, genre } = req.body;

    if (!title | !authorId | !publisherId | genre) {
      res.status(400).json({ status: 'error', message: 'Data missing' });
      return;
    }

    const { rows } = await client.query(
      'INSERT INTO books (title, author_id, publisher_id, publish_date, rating co_author_id, genre) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *',
      [title, authorId, publisherId, publishDate, rating, coAuthorId, genre]
    );

    res.status(201).json({ status: 'success', data: rows[0] });
  } catch ({ message }) {
    res.status(500).json(internalServerError());
  }
};

exports.updateBookTitleById = async (req, res) => {
  try {
    const { bookId } = req.params;
    const { title } = req.body;

    const { rows } = await client.query('UPDATE books SET title = $1 WHERE id = $2 RETURNING *', [
      title,
      bookId
    ]);

    res.status(200).json({ status: 'success', data: rows[0] });
  } catch ({ message }) {
    res.status(500).json(internalServerError());
  }
};

exports.deleteBookById = async (req, res) => {
  try {
    const { bookId } = req.params;

    const { rows } = await client.query('DELETE FROM books WHERE id = $1 RETURNING *', [bookId]);

    res.status(200).json({ status: 'success', data: rows[0] });
  } catch ({ message }) {
    res.status(500).json(internalServerError(message));
  }
};
