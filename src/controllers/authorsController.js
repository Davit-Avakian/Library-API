const { internalServerError, unAuthorizedError, badRequestError } = require('#utils');

const { Authors, Books, Publishers } = require('#models');
const { Op } = require('sequelize');

// get all authors
exports.getAllAuthors = async (req, res) => {
  const { sortBy, sortType, gender, offset } = req.query;

  const sortAndFilter = {
    order: [[sortBy, sortType]],

    offset,
    limit: 8
  };

  if (gender !== 'all')
    sortAndFilter.where = {
      gender
    };

  try {
    // get all data
    const { count, rows: data } = await Authors.findAndCountAll(sortAndFilter);

    res.status(200).json({ status: 'success', data, count });
  } catch ({ message }) {
    res.status(500).json({ status: 'error', message });
  }
};

// get author by passing century
exports.getAuthorsByCentury = async (req, res) => {
  try {
    const { century } = req.params;

    if (!century) {
      return res.status(400).json(badRequestError('Century missing'));
    }

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
    console.log(message);
    res.status(500).json(internalServerError(message));
  }
};

// get co author by book id
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
    console.log(message);
    res.status(500).json(internalServerError(message));
  }
};

// add new author
exports.addNewAuthor = async (req, res) => {
  try {
    const { firstName, lastName, gender, birthYear, privateKey } = req.body;

    if (!firstName | !lastName | !birthYear) {
      res.status(400).json(badRequestError('Data missing'));
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

exports.deleteAuthor = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json(badRequestError('Id is missing'));
    }

    const deletedAuthor = await Authors.destroy({
      where: {
        id
      }
    });

    return res.status(204).json({ status: 'success', data: deletedAuthor });
  } catch ({ message }) {
    console.log(message);
    res.status(500).json(internalServerError(message));
  }
};
