const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const { Profile } = require('../../models');
const { internalServerError, unAuthorizedError, badRequestError } = require('../utils/utils');
require('dotenv').config();

const transport = nodemailer.createTransport({
  host: 'smtp.mailtrap.io',
  port: 2525,
  auth: {
    user: 'c4a9105ce57638',
    pass: '5f4b8758a39421'
  }
});

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

    const verifyToken = jwt.sign({ email: email }, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: '1h'
    });

    transport.sendMail(
      {
        from: 'example@gmail.com',
        to: email,
        subject: 'Verify Email',
        html: `<b>Please verify your email using this token ${verifyToken}</b>`
      },

      (err) => {
        if (err) {
          console.log('Sending Email Failed: ', err);
          return;
        }

        console.log('Email sent');
      }
    );

    res.status(201).json({ status: 'success', message: 'User created' });
  } catch (error) {
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

    res.status(200).json({ status: 'success', token, role: foundUser.role });
  } catch ({ message }) {
    res.status(500).json(internalServerError(message));
  }
};

// verify new user
exports.verifyUser = async (req, res) => {
  try {
    const { token } = req.params;

    if (!token) {
      return res.status(400).json(badRequestError('Token Missing'));
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err) => {
      if (err) {
        return res.status(401).json(unAuthorizedError('Verify Token is invalid'));
      }

      const { email } = jwt.decode(token);

      await Profile.update(
        { isVerified: true },
        {
          where: {
            email
          }
        }
      );

      res.status(200).json({ status: 'success', message: 'User successfully verified' });
    });
  } catch ({ message }) {
    res.status(500).json(internalServerError(message));
  }
};
