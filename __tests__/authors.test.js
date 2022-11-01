/* eslint-disable no-undef */
const supertest = require('supertest');
const app = require('../app');
const request = supertest(app);

describe('Authors Router', () => {
  const headers = {
    Authorization: `Bearer ${'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoicHVibGlzaGVyIiwiaWF0IjoxNjY3Mjk3MTY5LCJleHAiOjE2NjczMDA3Njl9.nSsG5OEYh1ALUxBElaTHvl1w4wlhQL2jHB3weo_jufU'}`
  };

  describe('Get all authors', () => {
    test('should return all authors', async () => {
      const response = await request.get('/authors').set(headers);

      expect(response.statusCode).toBe(200);
      expect(response.body.data).toBeDefined();
    });
  });

  describe('Get authors by century', () => {
    test('should return all authors by given century', async () => {
      const response = await request.get('/authors/century/18').set(headers);

      expect(response.statusCode).toBe(200);
      expect(response.body.data).toBeDefined();
    });
  });

  describe('Get co author by book id', () => {
    test('should return co author for given book', async () => {
      const response = await request
        .get('/authors/co-author/fce95247-b99f-4fdf-8302-7529b57074c7')
        .set(headers);

      expect(response.statusCode).toBe(200);
      expect(response.body.data).toBeDefined();
    });
  });

  describe('Add new author', () => {
    const newAuthor = {
      firstName: 'newAuthor',
      lastName: 'newAuthor',
      gender: 'male',
      birthYear: 1935,
      privateKey: 'private-key1'
    };

    test('should add new author and return it', async () => {
      const response = await request.post('/authors').set(headers).send(newAuthor);

      expect(response.statusCode).toBe(201);
      expect(response.body.data).toBeDefined();
    });

    test('should fail to add when private key is not real', async () => {
      const response = await request
        .post('/authors')
        .set(headers)
        .send({ ...newAuthor, privateKey: 'fake-key' });

      expect(response.statusCode).toBe(401);
      expect(response.body.message).toBe('Unauthorized to create author');
    });
  });
});
