const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Profile } = require('../../models');
const { internalServerError, unAuthorizedError, badRequestError } = require('../utils/utils');
require('dotenv').config();

// register new user
exports.registerUser = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;

    const userExists = await Profile.findOne({
      where: {
        email
      }
    });

    if (!username || !email || !password) {
      return res.status(400).json(badRequestError('Data missing'));
    }

    // check if user exists
    if (userExists) {
      return res.status(400).json(badRequestError('User with email already exists'));
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // create new user
    await Profile.create({
      username,
      email,
      role,
      password: hashedPassword
    });

    res.status(201).json({ status: 'success', message: 'User created' });
  } catch (error) {
    console.log(error);
    res.status(500).json(internalServerError(error.message));
  }
};

// login user
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const foundUser = await Profile.findOne({
      where: {
        email
      }
    });

    // check if user exists
    if (!foundUser) {
      return res.status(400).json(badRequestError('User with given email not found'));
    }

    // compare password
    const match = await bcrypt.compare(password, foundUser.password);

    if (!match) {
      return res.status(401).json(unAuthorizedError('Passwords does not match'));
    }

    // create access token
    const token = jwt.sign({ role: foundUser.role }, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: '1h'
    });

    res.status(200).json({ status: 'success', token });
  } catch ({ message }) {
    res.status(500).json(internalServerError(message));
  }
};
