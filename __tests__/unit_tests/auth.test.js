const { badRequestError, unAuthorizedError } = require('../../src/utils/utils');
const { registerUser, login, verifyUser } = require('../../src/controllers/authController');

describe('Auth Controller Functions', () => {
  let req = {};
  const res = {};

  const user = {
    username: 'test123',
    email: `${Math.random()}@gmail.com`,
    role: 'publisher',
    password: 'test'
  };

  beforeEach(() => {
    res.json = jest.fn().mockReturnValue(res);
    res.status = jest.fn().mockReturnValue(res);

    req = {};
  });

  // register function
  describe('register user function', () => {
    test('returns user created message given valid parameters', async () => {
      req.body = user;
      user.email = `${Math.random()}@gmail.com`;

      await registerUser(req, res);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({ status: 'success', message: 'User created' });
    });

    test('returns bad request error message not given all required parameters', async () => {
      delete user.username;
      req.body = user;
      user.email = `${Math.random()}@gmail.com`;

      await registerUser(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith(badRequestError('Data missing'));
    });
  });

  // login function
  describe('login user function', () => {
    test('return token given valid parameters', async () => {
      req.body = {
        email: 'test@gmail.com',
        password: 'test'
      };

      await login(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledTimes(1);
    });

    test('return bad request error message given wrong email', async () => {
      req.body = {
        email: 'wrong',
        password: 'test'
      };

      await login(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith(badRequestError('User with given email not found'));
    });

    test('return unauthorized error message given wrong password', async () => {
      req.body = {
        email: 'test@gmail.com',
        password: 'wrong'
      };

      await login(req, res);

      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith(unAuthorizedError('Passwords does not match'));
    });
  });

  // verify function
  describe('verify user function', () => {
    test('return verification message given valid verify token', async () => {
      req.params = {
        token:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IjAuMTI3NzM3ODg0MTQ2NjcxMkBnbWFpbC5jb20iLCJpYXQiOjE2Njc1NTI4MjUsImV4cCI6MTY2NzU1NjQyNX0.2FmJ0QEFTuhFJLms6m6E5k4MJEssM7xyJ5tJw24lvFM'
      };

      await verifyUser(req, res);

      // expect(res.status).toHaveBeenCalledWith(200);
      // expect(res.json).toHaveBeenCalledWith({
      //   status: 'success',
      //   message: 'User successfully verified'
      // });
    });

    test('return bad request error message not given token', async () => {
      req.params = {};

      await verifyUser(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith(badRequestError('Token Missing'));
    });

    test('return unauthorized error message given invalid verify token', async () => {
      req.params = {
        token: 'invalid token'
      };

      await verifyUser(req, res);

      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith(unAuthorizedError('Verify Token is invalid'));
    });
  });
});
