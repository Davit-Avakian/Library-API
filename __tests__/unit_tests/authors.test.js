const { badRequestError } = require('#utils');
const {
  getAllAuthors,
  getAuthorsByCentury,
  getCoAuthorByBookId,
  addNewAuthor
} = require('../../src/controllers/authorsController');

describe('Authors Controller Functions', () => {
  let req = {};
  const res = {};

  beforeEach(() => {
    res.json = jest.fn().mockReturnValue(res);
    res.status = jest.fn().mockReturnValue(res);

    req = {
      authorization:
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoicHVibGlzaGVyIiwiaWF0IjoxNjY3NTU2MzMzLCJleHAiOjE2Njc1NTk5MzN9.4QrFm_LY1eH-DyG4hbshAdtnmAbcuh9PzXxXSgcjcQ8'
    };
  });

  // get all authors
  describe('get all authors function', () => {
    test('return all sorted and filtered authors', async () => {
      req.query = {
        sortBy: 'first_name',
        sortType: 'asc',
        gender: 'all'
      };

      await getAllAuthors(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledTimes(1);
    });
  });

  // get authors by century
  describe('get authors by century function', () => {
    test('return authors given century', async () => {
      req.params = {
        century: 18
      };

      await getAuthorsByCentury(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledTimes(1);
    });

    test('return bad request error message not given century', async () => {
      req.params = {};

      await getAuthorsByCentury(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith(badRequestError('Century missing'));
    });
  });

  // get co author by book id
  describe('get co uthor by book id function', () => {
    test('return co author given book id', async () => {
      req.params = {
        bookId: 'fce95247-b99f-4fdf-8302-7529b57074c7'
      };

      await getCoAuthorByBookId(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledTimes(1);
    });
  });

  // add new author
  describe('add new author function', () => {
    const newAuthor = {
      firstName: 'newAuthor',
      lastName: 'newAuthor',
      gender: 'male',
      birthYear: 1935,
      privateKey: 'private-key1'
    };

    test('return created author given valid parameters', async () => {
      req.body = newAuthor;

      await addNewAuthor(req, res);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledTimes(1);
    });

    test('return bad request error not given all required fields', async () => {
      delete newAuthor.firstName;
      req.body = newAuthor;

      await addNewAuthor(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith(badRequestError('Data missing'));
    });
  });
});
