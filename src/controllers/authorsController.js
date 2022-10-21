const client = require('../../config/connection');
const { internalServerError, getDataByField } = require('../utils/utils');

exports.getAuthorsByCentury = async (req, res) => {
  try {
    const { century } = req.params;

    const { rows } = await client.query(
      'SELECT * FROM author WHERE birth_year >= $1 AND birth_year <= $2',
      [(century - 1) * 100, century * 100]
    );

    res.status(200).json({ status: 'success', data: rows });
  } catch ({ message }) {
    res.status(500).json(internalServerError(message));
  }
};

exports.getCoAuthorByBookId = async (req, res) => {
  try {
    const { bookId } = req.params;

    const { rows } = await client.query(
      `SELECT author.id, first_name, last_name, gender, birth_year from author
      INNER JOIN books
      ON author.id=books.co_author_id and books.id = $1`,
      [bookId]
    );

    res.status(200).json({ status: 'success', data: rows[0] });
  } catch ({ message }) {
    res.status(500).json(internalServerError(message));
  }
};

exports.addNewAuthor = async (req, res) => {
  try {
    const { firstName, lastName, gender, birthYear, privateKey } = req.body;

    if (!firstName | !lastName | !birthYear) {
      res.status(400).json({ status: 'error', message: 'Data missing' });
      return;
    }

    const publisher = await getDataByField('publishers', 'private_key', privateKey);

    if (!publisher.length) {
      res.status(401).json({ status: 'error', message: 'Unauthorized to create author' });
      return;
    }

    const { rows } = await client.query(
      'INSERT INTO author (first_name, last_name, gender, birth_year) VALUES($1, $2, $3, $4) RETURNING *',
      [firstName, lastName, gender, birthYear]
    );

    res.status(201).json({ status: 'success', data: rows[0] });
  } catch ({ message }) {
    res.status(500).json(internalServerError());
  }
};
