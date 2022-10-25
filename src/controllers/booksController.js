const { internalServerError } = require('../utils/utils');
const { Books } = require('../../models');

// get all books
exports.getAllBooks = async (req, res) => {
  try {
    // find all books
    const books = await Books.findAll();

    res.status(200).json({ status: 'success', data: books });
  } catch ({ message }) {
    res.status(500).json(internalServerError(message));
  }
};

// get book by it's id
exports.getBookById = async (req, res) => {
  try {
    const { bookId } = req.params;

    // find book
    const data = await Books.findByPk(bookId);

    res.status(200).json({ status: 'success', data });
  } catch ({ message }) {
    res.status(500).json(internalServerError(message));
  }
};

// get book bt genre
exports.getBookByGenre = async (req, res) => {
  try {
    const { genre } = req.params;

    // find all books with genre
    const data = await Books.findAll({
      where: {
        genre
      }
    });

    res.status(200).json({ status: 'success', data });
  } catch ({ message }) {
    res.status(500).json(internalServerError(message));
  }
};

// get author's books
exports.getBooksByAuthorId = async (req, res) => {
  try {
    const { authorId } = req.params;

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

// get author's books by genre
exports.getAuthorBooksByGenre = async (req, res) => {
  try {
    const { authorId, genre } = req.params;

    const data = await Books.findAll({
      where: {
        author_id: authorId,
        genre
      }
    });

    res.status(200).json({ status: 'success', data });
  } catch ({ message }) {
    res.status(500).json(internalServerError(message));
  }
};

// get publisher's books
exports.getBooksByPublisherId = async (req, res) => {
  try {
    const { publisherId } = req.params;

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
      res.status(400).json({ status: 'error', message: 'Data missing' });
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
