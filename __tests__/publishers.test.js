/* eslint-disable no-undef */
const supertest = require('supertest');
const app = require('../app');
const request = supertest(app);

describe('Publishers Router', () => {
  const headers = {
    Authorization: `Bearer ${'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoicHVibGlzaGVyIiwiaWF0IjoxNjY3Mjk3MTY5LCJleHAiOjE2NjczMDA3Njl9.nSsG5OEYh1ALUxBElaTHvl1w4wlhQL2jHB3weo_jufU'}`
  };

  describe('Get all publishers', () => {
    test('return all publishers', async () => {
      const response = await request.get('/publishers').set(headers);

      expect(response.statusCode).toBe(200);
      expect(response.body.data).toBeDefined();
    });
  });

  describe('Get publishers by author id', () => {
    test('return all publishers given author id', async () => {
      const response = await request
        .get('/publishers/author/35383128-f444-434d-a12f-4240a2027797')
        .set(headers);

      expect(response.statusCode).toBe(200);
      expect(response.body.data).toBeDefined();
    });
  });
});
