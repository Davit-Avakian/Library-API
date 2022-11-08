const supertest = require('supertest');
const app = require('../../src/routes');
const request = supertest(app);

describe('Auth Router', () => {
  const newUser = {
    username: 'newUser123',
    email: 'newUser@gmail.com',
    role: 'publisher',
    password: 'newUser'
  };

  describe('Register Route', () => {
    test('successfully register given valid credentials', async () => {
      const response = await request.post('/auth/register').send(newUser);

      expect(response.statusCode).toBe(201);
      expect(response.body.status).toBe('success');
    });

    test('register failure given existing email', async () => {
      const response = await request.post('/auth/register').send(newUser);

      expect(response.statusCode).toBe(400);
      expect(response.body.message).toBe('User with email already exists');
    });
  });

  describe('Login Route', () => {
    test('return token given given valid login parameters', async () => {
      const response = await request
        .get('/auth/login')
        .send({ email: newUser.email, password: newUser.password });

      expect(response.statusCode).toBe(200);
      expect(response.body.token).toBeDefined();
    });

    test('login failure given wrong password', async () => {
      const response = await request
        .get('/auth/login')
        .send({ email: newUser.email, password: 'wrongPassword' });

      expect(response.statusCode).toBe(401);
      expect(response.body.message).toBe('Passwords does not match');
    });
  });

  describe('Verify Token Route', () => {
    const verifyToken =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RAZ21haWwuY29tIiwiaWF0IjoxNjY3MzEyNTM1LCJleHAiOjE2NjczMTYxMzV9.mAUYoBOTU459DYasm4s7rRKnKioVQyBZU9gsiDHmUDU';

    test('make user verified given valid verify token', async () => {
      const response = await request.put(`/auth/verify/${verifyToken}`);

      expect(response.statusCode).toBe(200);
      expect(response.body.message).toBe('User successfully verified');
    });

    test('return error message given invalid verify token', async () => {
      const response = await request.put(`/auth/verify/invalidToken`);

      expect(response.statusCode).toBe(401);
      expect(response.body.message).toBe('Verify Token is invalid');
    });
  });
});
