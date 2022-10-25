const { internalServerError } = require('../utils/utils');
const { Authors, Books, Publishers } = require('../../models');
const { Op } = require('sequelize');

exports.getAllAuthors = async (req, res) => {
  try {
    const data = await Authors.findAll();

    res.status(200).json({ status: 'success', data });
  } catch ({ message }) {
    res.status(500).json({ status: 'error', message });
  }
};

exports.getAuthorsByCentury = async (req, res) => {
  try {
    const { century } = req.params;

    const data = await Authors.findAll({
      where: {
        birth_year: {
          [Op.and]: {
            [Op.gte]: (century - 1) * 100 + 1,
            [Op.lte]: century * 100
          }
        }
      }
    });

    res.status(200).json({ status: 'success', data });
  } catch ({ message }) {
    res.status(500).json(internalServerError(message));
  }
};

exports.getCoAuthorByBookId = async (req, res) => {
  try {
    const { bookId } = req.params;

    const book = await Books.findByPk(bookId);

    if (!book) {
      return res.status(400).json({ status: 'error', message: 'Book Not Found' });
    }

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

exports.addNewAuthor = async (req, res) => {
  try {
    const { firstName, lastName, gender, birthYear, privateKey } = req.body;

    if (!firstName | !lastName | !birthYear) {
      res.status(400).json({ status: 'error', message: 'Data missing' });
      return;
    }

    const publisher = await Publishers.findOne({
      where: {
        private_key: privateKey
      }
    });

    if (!publisher) {
      res.status(401).json({ status: 'error', message: 'Unauthorized to create author' });
      return;
    }

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
