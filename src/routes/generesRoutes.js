const { Router } = require('express');
const { getAllGenres } = require('../controllers/genresController');

const router = Router();

router.get('/', getAllGenres);

module.exports.genresRouter = router;
