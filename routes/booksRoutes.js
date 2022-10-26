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

const router = Router();

router
  .get('/', getAllBooks)
  .get('/:bookId', getBookById)
  .get('/genre/:genre', getBookByGenre)
  .get('/author/:authorId', getBooksByAuthorId)
  .get('/author/:authorId/:genre', getAuthorBooksByGenre)
  .get('/publisher/:publisherId', getBooksByPublisherId)
  .post('/', addNewBook)
  .put('/:bookId', updateBookTitleById)
  .delete('/:bookId', deleteBookById);

module.exports.booksRouter = router;
