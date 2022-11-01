const { Router } = require('express');
const {
  getAllBooks,
  getBooksByAuthorId,
  addNewBook,
  updateBookTitleById,
  deleteBookById,
  getBooksByPublisherId,
  getBookById
} = require('../controllers/booksController');
const { verifyRole } = require('../middleware');
const {
  ROLES: { publisher, author }
} = require('../utils/utils');

const router = Router();

router
  .get('/', getAllBooks)
  .get('/:bookId', getBookById)
  .get('/author/:authorId', getBooksByAuthorId)
  .get('/publisher/:publisherId', verifyRole([publisher, author]), getBooksByPublisherId)
  .post('/', verifyRole([publisher, author]), addNewBook)
  .put('/:bookId', verifyRole([publisher, author]), updateBookTitleById)
  .delete('/:bookId', verifyRole([publisher, author]), deleteBookById);

module.exports.booksRouter = router;
