const { Router } = require('express');
const {
  getPublishersByAuthorId,
  getAllPublishers,
  deletePublisher
} = require('../controllers/publishersController');
const { verifyRole } = require('#middleware');
const {
  ROLES: { publisher }
} = require('#utils');

const router = Router();

router
  .get('/', getAllPublishers)
  .get('/author/:authorId', verifyRole([publisher]), getPublishersByAuthorId)
  .delete('/:id', verifyRole([publisher]), deletePublisher);

module.exports.publishersRouter = router;
