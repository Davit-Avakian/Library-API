const supertest = require('supertest');
const app = require('../../src/routes');
const request = supertest(app);

describe('Authors Router', () => {
  const headers = {
    Authorization: `Bearer ${'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoicHVibGlzaGVyIiwiaWF0IjoxNjY3MzE3MjIwLCJleHAiOjE2NjczMjA4MjB9.1wOJ9Az1tijxT5Zb3Md9IUBuddy2asO6dn2E7dFvuDM'}`
  };

  describe('Get all authors', () => {
    test('return error given no headers', async () => {
      const response = await request.get('/authors');

      expect(response.statusCode).toBe(400);
      expect(response.body.message).toBe('Token missing');
    });

    test('return all authors', async () => {
      const response = await request.get('/authors').set(headers);

      expect(response.statusCode).toBe(200);
      expect(response.body.data).toBeDefined();
    });
  });

  describe('Get authors by century', () => {
    test('return all authors given century', async () => {
      const response = await request.get('/authors/century/18').set(headers);

      expect(response.statusCode).toBe(200);
      expect(response.body.data).toBeDefined();
    });
  });

  describe('Get co author by book id', () => {
    test('return co author given book id', async () => {
      const response = await request
        .get('/authors/co-author/fce95247-b99f-4fdf-8302-7529b57074c7')
        .set(headers);

      expect(response.statusCode).toBe(200);
      expect(response.body.data).toBeDefined();
    });

    test('return error given invalid book id', async () => {
      const response = await request.get('/authors/co-author/wrongId').set(headers);

      expect(response.statusCode).toBe(500);
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

    test('return and add new author', async () => {
      const response = await request.post('/authors').set(headers).send(newAuthor);

      expect(response.statusCode).toBe(201);
      expect(response.body.data).toBeDefined();
    });

    test('fail adding author given invalid private key', async () => {
      const response = await request
        .post('/authors')
        .set(headers)
        .send({ ...newAuthor, privateKey: 'fake-key' });

      expect(response.statusCode).toBe(401);
      expect(response.body.message).toBe('Unauthorized to create author');
    });
  });
});
