const { Router } = require('express');
const { registerUser, login, verifyUser } = require('../controllers/authController');

const router = Router();

router.post('/register', registerUser).post('/login', login).put('/verify/:token', verifyUser);

module.exports.authRouter = router;
