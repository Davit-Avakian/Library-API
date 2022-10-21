const { Router } = require('express');
const { getPublishersByAuthorId } = require('../controllers/publishersController');

const router = Router();

router.get('/author/:authorId', getPublishersByAuthorId);

module.exports.publishersRouter = router;
