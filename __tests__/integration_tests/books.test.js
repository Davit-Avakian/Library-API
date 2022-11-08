const supertest = require('supertest');
const app = require('../../src/routes');
const request = supertest(app);

describe('Books Router', () => {
  const headers = {
    Authorization: `Bearer ${'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoicHVibGlzaGVyIiwiaWF0IjoxNjY3MzE3OTE3LCJleHAiOjE2NjczMjE1MTd9.SZYgYqAL3sXR5zbIEtQhghdnLno0rm9LiU7KgI38Jvo'}`
  };

  describe('Get All Books', () => {
    test('return all books', async () => {
      const response = await request.get('/books').set(headers);

      expect(response.statusCode).toBe(200);
      expect(response.body.data).toBeDefined();
    });
  });

  describe('Get book by id', () => {
    test('return book given id', async () => {
      const response = await request
        .get('/books/fce95247-b99f-4fdf-8302-7529b57074c7')
        .set(headers);

      expect(response.statusCode).toBe(200);
      expect(response.body.data).toBeDefined();
    });

    test('return error given invalid id', async () => {
      const response = await request.get('/books/wrongId').set(headers);

      expect(response.statusCode).toBe(500);
    });
  });

  describe('Get books by author', () => {
    test('return all books given author id', async () => {
      const response = await request
        .get('/books/author/35383128-f444-434d-a12f-4240a2027797')
        .set(headers);

      expect(response.statusCode).toBe(200);
      expect(response.body.data).toBeDefined();
    });
  });

  describe('Get books by publisher', () => {
    test('return all books given publisher id', async () => {
      const response = await request
        .get('/books/publisher/f250dc8d-a019-49f0-bf05-d23d7ba0094f')
        .set(headers);

      expect(response.statusCode).toBe(200);
      expect(response.body.data).toBeDefined();
    });
  });

  describe('Add new book', () => {
    const newBook = {
      title: 'newBook',
      author_id: '35383128-f444-434d-a12f-4240a2027797',
      publisher_id: 'f250dc8d-a019-49f0-bf05-d23d7ba0094f',
      genre: 'fantasy'
    };

    test('add and return new book', async () => {
      const response = await request.post('/books').set(headers).send(newBook);

      expect(response.statusCode).toBe(201);
      expect(response.body.data.title).toBe(newBook.title);
    });
  });

  describe('Update book title by id', () => {
    test('return all books given publisher id', async () => {
      const response = await request
        .put('/fce95247-b99f-4fdf-8302-7529b57074c7')
        .set(headers)
        .send({ title: 'updated title' });

      expect(response.statusCode).toBe(204);
      expect(response.body.data.title).toBe('updated title');
    });
  });

  describe('Delete book title by id', () => {
    test('delete book given id', async () => {
      const response = await request
        .delete('/books/2785afeb-f1b4-4a04-b22c-74dfdca8c853')
        .set(headers);

      expect(response.statusCode).toBe(204);
    });
  });
});
