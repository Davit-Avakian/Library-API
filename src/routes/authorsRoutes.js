const { Router } = require('express');
const {
  getAuthorsByCentury,
  addNewAuthor,
  getCoAuthorByBookId,
  getAllAuthors
} = require('../controllers/authorsController.js');
const { verifyRole } = require('../middleware');
const {
  ROLES: { publisher, author }
} = require('../utils/utils');

const router = Router();

router
  .get('/', getAllAuthors)
  .get('/century/:century', verifyRole([publisher, author]), getAuthorsByCentury)
  .get('/co-author/:bookId', verifyRole([publisher, author]), getCoAuthorByBookId)
  .post('/', verifyRole([publisher, author]), addNewAuthor);

module.exports.authorsRouter = router;
