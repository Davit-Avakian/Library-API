const { Router } = require('express');
const { registerUser, login } = require('../controllers/authController');

const router = Router();

router.post('/register', registerUser).get('/login', login);

module.exports.authRouter = router;
