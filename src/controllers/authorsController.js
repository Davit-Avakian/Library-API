const { internalServerError, unAuthorizedError } = require('../utils/utils');
const { Authors, Books, Publishers } = require('../../models');
const { Op } = require('sequelize');

// get all authors
exports.getAllAuthors = async (req, res) => {
  try {
    // get all data
    const data = await Authors.findAll();

    res.status(200).json({ status: 'success', data });
  } catch ({ message }) {
    res.status(500).json({ status: 'error', message });
  }
};

// get author by passing century
exports.getAuthorsByCentury = async (req, res) => {
  try {
    const { century } = req.params;

    // find authors that match
    const data = await Authors.findAll({
      where: {
        birth_year: {
          [Op.between]: [(century - 1) * 100 + 1, century * 100]
        }
      }
    });

    res.status(200).json({ status: 'success', data });
  } catch ({ message }) {
    res.status(500).json(internalServerError(message));
  }
};

// get book's co author
exports.getCoAuthorByBookId = async (req, res) => {
  try {
    const { bookId } = req.params;

    const book = await Books.findByPk(bookId);

    // check if book exists
    if (!book) {
      return res.status(404).json({ status: 'error', message: 'Book Not Found' });
    }

    // find co author
    const data = await Authors.findOne({
      where: {
        id: book.co_author_id
      }
    });

    res.status(200).json({ status: 'success', data });
  } catch ({ message }) {
    res.status(500).json(internalServerError(message));
  }
};

// add new author
exports.addNewAuthor = async (req, res) => {
  try {
    const { firstName, lastName, gender, birthYear, privateKey } = req.body;

    if (!firstName | !lastName | !birthYear) {
      res.status(400).json({ status: 'error', message: 'Data missing' });
      return;
    }

    // find publisher by private key
    const publisher = await Publishers.findOne({
      where: {
        private_key: privateKey
      }
    });

    // check if publisher exists
    if (!publisher) {
      res.status(401).json(unAuthorizedError('Unauthorized to create author'));
      return;
    }

    // create new author
    const createdAuthor = await Authors.create({
      first_name: firstName,
      last_name: lastName,
      gender,
      birth_year: birthYear
    });

    res.status(201).json({ status: 'success', data: createdAuthor });
  } catch ({ message }) {
    res.status(500).json(internalServerError(message));
  }
};
