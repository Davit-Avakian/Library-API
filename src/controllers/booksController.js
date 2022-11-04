const { internalServerError, badRequestError } = require('../utils/utils');
const { Books } = require('../../models');
const { Op } = require('sequelize');

// get all books
exports.getAllBooks = async (req, res) => {
  const { sortBy, sortType, offset, genres } = req.query;

  try {
    // find all books
    const { count, rows: books } = await Books.findAndCountAll({
      where: {
        genre_ids: {
          [Op.contains]: genres?.length ? genres.split(',') : []
        }
      },

      order: [[sortBy, sortType]],

      offset,
      limit: 8
    });

    res.status(200).json({ status: 'success', data: books, count });
  } catch ({ message }) {
    res.status(500).json(internalServerError(message));
  }
};

// get book by it's id
exports.getBookById = async (req, res) => {
  try {
    const { bookId } = req.params;

    if (!bookId) {
      return res.status(400).json(badRequestError('Book id missing'));
    }

    // find book
    const data = await Books.findByPk(bookId);

    res.status(200).json({ status: 'success', data });
  } catch ({ message }) {
    res.status(500).json(internalServerError(message));
  }
};

// get author's books
exports.getBooksByAuthorId = async (req, res) => {
  try {
    const { authorId } = req.params;

    if (!authorId) {
      return res.status(400).json(badRequestError('Author id is missing'));
    }

    // find and count all matching books
    const { count, rows } = await Books.findAndCountAll({
      where: {
        author_id: authorId
      }
    });

    res.status(200).json({ status: 'success', count, data: rows });
  } catch ({ message }) {
    res.status(500).json(internalServerError(message));
  }
};

// get publisher's books
exports.getBooksByPublisherId = async (req, res) => {
  try {
    const { publisherId } = req.params;

    if (!publisherId) {
      return res.status(400).json(badRequestError('Publisher id is missing'));
    }

    // find all publisher books
    const data = await Books.findAll({
      where: {
        publisher_id: publisherId
      }
    });

    res.status(200).json({ status: 'success', data });
  } catch ({ message }) {
    res.status(500).json(internalServerError(message));
  }
};

// add new book
exports.addNewBook = async (req, res) => {
  try {
    const { title, author_id, publisher_id, genre } = req.body;

    if (!title | !author_id | !publisher_id | genre) {
      res.status(400).json(badRequestError('Data missing'));
      return;
    }

    // create new book
    const createdBook = await Books.create(req.body);

    res.status(201).json({ status: 'success', data: createdBook });
  } catch ({ message }) {
    res.status(500).json(internalServerError());
  }
};

// update book title
exports.updateBookTitleById = async (req, res) => {
  try {
    const { bookId } = req.params;
    const { title } = req.body;

    if (!bookId || !title) {
      return res.status(400).json(badRequestError('Id or title missing'));
    }

    // update book
    const data = await Books.update(
      {
        title
      },
      {
        where: {
          id: bookId
        }
      }
    );

    res.status(204).json({ status: 'success', data });
  } catch ({ message }) {
    res.status(500).json(internalServerError());
  }
};

// delete book by id
exports.deleteBookById = async (req, res) => {
  try {
    const { bookId } = req.params;

    if (!bookId) {
      return res.status(400).json(badRequestError('Id is missing'));
    }

    // delete book
    const deletedBook = await Books.destroy({
      where: {
        id: bookId
      }
    });

    res.status(204).json({ status: 'success', data: deletedBook });
  } catch ({ message }) {
    res.status(500).json(internalServerError(message));
  }
};
