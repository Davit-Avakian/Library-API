const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Users } = require('../../models');
const { internalServerError } = require('../utils/utils');
require('dotenv').config();

exports.registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const userExists = await Users.findOne({
      where: {
        email
      }
    });

    if (!username || !email || !password) {
      return res.status(400).json({ status: 'error', message: 'Data missing' });
    }

    if (userExists) {
      return res.status(400).json({ status: 'error', message: 'User with email already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await Users.create({
      username,
      email,
      password: hashedPassword
    });

    res.status(201).json({ status: 'success', message: 'User created' });
  } catch ({ message }) {
    res.status(500).json(internalServerError(message));
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const foundUser = await Users.findOne({
      where: {
        email
      }
    });

    if (!foundUser) {
      return res.status(400).json({ status: 'error', message: 'User with given email not found' });
    }

    const match = await bcrypt.compare(password, foundUser.password);

    if (!match) {
      return res.status(401).json({ status: 'error', message: 'Password does not match' });
    }

    const token = await jwt.sign({}, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' });

    res.status(200).json({ status: 'success', token });
  } catch ({ message }) {
    res.status(500).json(internalServerError(message));
  }
};
