const { Router } = require('express');
const {
  getAllBooks,
  getBooksByAuthorId,
  addNewBook,
  updateBookTitleById,
  deleteBookById,
  getBooksByPublisherId,
  getBookById,
  getBookByGenre,
  getAuthorBooksByGenre
} = require('../controllers/booksController');
const { verifyRole } = require('../middleware');
const {
  ROLES: { publisher, author }
} = require('../utils/utils');

const router = Router();

router
  .get('/', getAllBooks)
  .get('/:bookId', getBookById)
  .get('/genre/:genre', getBookByGenre)
  .get('/author/:authorId', getBooksByAuthorId)
  .get('/author/:authorId/:genre', getAuthorBooksByGenre)
  .get('/publisher/:publisherId', verifyRole([publisher, author]), getBooksByPublisherId)
  .post('/', verifyRole([publisher, author]), addNewBook)
  .put('/:bookId', verifyRole([publisher, author]), updateBookTitleById)
  .delete('/:bookId', verifyRole([publisher, author]), deleteBookById);

module.exports.booksRouter = router;
