const { Router } = require('express');
const {
  getAuthorsByCentury,
  addNewAuthor,
  getCoAuthorByBookId
} = require('../controllers/authorsController');

const router = Router();

router
  .get('/century/:century', getAuthorsByCentury)
  .get('/co-author/:bookId', getCoAuthorByBookId)
  .post('/', addNewAuthor);

module.exports.authorsRouter = router;
