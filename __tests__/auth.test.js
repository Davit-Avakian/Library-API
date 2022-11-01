/* eslint-disable no-undef */
const supertest = require('supertest');
const app = require('../app');
const request = supertest(app);

describe('Auth Router', () => {
  const newUser = {
    username: 'newUser123',
    email: 'newUser@gmail.com',
    role: 'publisher',
    password: 'newUser'
  };

  describe('Register Route', () => {
    test('should successfully register new user with valid credentials', async () => {
      const response = await request.post('/auth/register').send(newUser);

      expect(response.statusCode).toBe(201);
      expect(response.body.status).toBe('success');
    });

    test('should not register new user with existing email', async () => {
      const response = await request.post('/auth/register').send(newUser);

      expect(response.statusCode).toBe(400);
      expect(response.body.message).toBe('User with email already exists');
    });
  });

  describe('Login Route', () => {
    test('should send back token after successfull login', async () => {
      const response = await request
        .get('/auth/login')
        .send({ email: newUser.email, password: newUser.password });

      expect(response.statusCode).toBe(200);
      expect(response.body.token).toBeDefined();
    });

    test('should fail login with wrong password', async () => {
      const response = await request
        .get('/auth/login')
        .send({ email: newUser.email, password: 'wrongPassword' });

      expect(response.statusCode).toBe(401);
      expect(response.body.message).toBe('Passwords does not match');
    });
  });
});
