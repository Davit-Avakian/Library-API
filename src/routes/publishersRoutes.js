const { Router } = require('express');
const {
  getPublishersByAuthorId,
  getAllPublishers,
  deletePublisher,
  addNewPublisher
} = require('../controllers/publishersController');
const { verifyRole } = require('#middleware');
const {
  ROLES: { publisher }
} = require('#utils');

const router = Router();

router
  .get('/', getAllPublishers)
  .get('/author/:authorId', verifyRole([publisher]), getPublishersByAuthorId)
  .post('/', verifyRole([publisher]), addNewPublisher)
  .delete('/:id', verifyRole([publisher]), deletePublisher);

module.exports.publishersRouter = router;
