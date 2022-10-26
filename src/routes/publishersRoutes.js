const { Router } = require('express');
const {
  getPublishersByAuthorId,
  getAllPublishers
} = require('../controllers/publishersController');
const { verifyRole } = require('#middleware');
const {
  ROLES: { publisher }
} = require('#utils');

const router = Router();

router
  .get('/', getAllPublishers)
  .get('/author/:authorId', verifyRole([publisher]), getPublishersByAuthorId);

module.exports.publishersRouter = router;
