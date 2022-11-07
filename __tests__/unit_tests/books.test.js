const { badRequestError } = require('#utils');
const {
  getAllBooks,
  getBookById,
  getBooksByAuthorId,
  getBooksByPublisherId,
  addNewBook,
  updateBookTitleById,
  deleteBookById
} = require('../../src/controllers/booksController');

describe('Books Controller Functions', () => {
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

  // get all books
  describe('get all books function', () => {
    test('return all books', async () => {
      req.query = {
        sortBy: 'rating',
        sortType: 'asc',
        generes: []
      };

      await getAllBooks(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledTimes(1);
    });
  });

  // get book by id
  describe('get book by id function', () => {
    test('return book given book id', async () => {
      req.params = {
        bookId: 'a80ad6ee-f792-40ab-8967-6ac58c6b529c'
      };

      await getBookById(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledTimes(1);
    });

    test('return bad request error messgae not given book id', async () => {
      req.params = {};

      await getBookById(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith(badRequestError('Book id missing'));
    });
  });

  // get books by author id
  describe('get books by author id function', () => {
    test('return all books given author id', async () => {
      req.params = {
        authorId: '35383128-f444-434d-a12f-4240a2027797'
      };

      await getBooksByAuthorId(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledTimes(1);
    });

    test('return all books given author id', async () => {
      req.params = {};

      await getBooksByAuthorId(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith(badRequestError('Author id is missing'));
    });
  });

  // get books by publisher id
  describe('get books by publisher id function', () => {
    test('return all books given publisher id', async () => {
      req.params = {
        publisherId: 'f250dc8d-a019-49f0-bf05-d23d7ba0094f'
      };

      await getBooksByPublisherId(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledTimes(1);
    });

    test('return bad request error message not given publisher id', async () => {
      req.params = {};

      await getBooksByPublisherId(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith(badRequestError('Publisher id is missing'));
    });
  });

  // add new book
  describe('add book function', () => {
    const newBook = {
      title: 'newBook',
      author_id: '35383128-f444-434d-a12f-4240a2027797',
      publisher_id: 'f250dc8d-a019-49f0-bf05-d23d7ba0094f',
      genre: 'fantasy'
    };

    test('return added book given valid parameters', async () => {
      req.body = newBook;

      await addNewBook(req, res);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledTimes(1);
    });

    test('return bad request error message not given all required parameters', async () => {
      delete newBook.title;
      req.body = newBook;

      await addNewBook(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith(badRequestError('Data missing'));
    });
  });

  // update book title
  describe('update book title by id function', () => {
    test('return updated book given id and new title', async () => {
      req.params = {
        bookId: '819b586d-b492-468a-be54-a90303cc0859'
      };

      req.body = {
        title: 'updatedTitle'
      };

      await updateBookTitleById(req, res);

      expect(res.status).toHaveBeenCalledWith(204);
      expect(res.json).toHaveBeenCalledTimes(1);
    });

    test('return bad request error messgae not given title', async () => {
      req.params = {
        bookId: '819b586d-b492-468a-be54-a90303cc0859'
      };

      req.body = {};

      await updateBookTitleById(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith(badRequestError('Id or title missing'));
    });
  });

  // delete book
  describe('delete book by id function', () => {
    test('return deleted book given id', async () => {
      req.params = {
        bookId: '819b586d-b492-468a-be54-a90303cc0859'
      };
      await deleteBookById(req, res);
      expect(res.status).toHaveBeenCalledWith(204);
      expect(res.json).toHaveBeenCalledTimes(1);
    });

    test('return bad request error message not given id', async () => {
      req.params = {};

      await deleteBookById(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith(badRequestError('Id is missing'));
    });
  });
});
