const { internalServerError } = require('../utils/utils');
const { Books } = require('../../models');

exports.getAllBooks = async (req, res) => {
  try {
    const books = await Books.findAll();

    res.status(200).json({ status: 'success', data: books });
  } catch ({ message }) {
    res.status(500).json(internalServerError(message));
  }
};

exports.getBookById = async (req, res) => {
  try {
    const { bookId } = req.params;

    const data = await Books.findByPk(bookId);

    res.status(200).json({ status: 'success', data });
  } catch ({ message }) {
    res.status(500).json(internalServerError(message));
  }
};

exports.getBookByGenre = async (req, res) => {
  try {
    const { genre } = req.params;

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

exports.getBooksByAuthorId = async (req, res) => {
  try {
    const { authorId } = req.params;

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

exports.getBooksByPublisherId = async (req, res) => {
  try {
    const { publisherId } = req.params;

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

exports.addNewBook = async (req, res) => {
  try {
    const { title, author_id, publisher_id, genre } = req.body;

    if (!title | !author_id | !publisher_id | genre) {
      res.status(400).json({ status: 'error', message: 'Data missing' });
      return;
    }

    const createdBook = await Books.create(req.body);

    res.status(201).json({ status: 'success', data: createdBook });
  } catch ({ message }) {
    res.status(500).json(internalServerError());
  }
};

exports.updateBookTitleById = async (req, res) => {
  try {
    const { bookId } = req.params;
    const { title } = req.body;

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

    res.status(200).json({ status: 'success', data });
  } catch ({ message }) {
    res.status(500).json(internalServerError());
  }
};

// exports.deleteBookById = async (req, res) => {
//   try {
//     const { bookId } = req.params;

//     const { rows } = await client.query('DELETE FROM books WHERE id = $1 RETURNING *', [bookId]);

//     res.status(200).json({ status: 'success', data: rows[0] });
//   } catch ({ message }) {
//     res.status(500).json(internalServerError(message));
//   }
// };
