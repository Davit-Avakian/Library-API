const { badRequestError } = require('#utils');
const { getAllPublishers, deletePublisher } = require('../../src/controllers/publishersController');

describe('Publishers Controller Functions', () => {
  let req = {};
  const res = {};

  beforeEach(() => {
    res.json = jest.fn().mockReturnValue(res);
    res.status = jest.fn().mockReturnValue(res);

    req = {
      authorization:
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoicHVibGlzaGVyIiwiaWF0IjoxNjY3NTU5MTMyLCJleHAiOjE2Njc1NjI3MzJ9.RZ7AzJAl0_zuhbmrlMzDpE-DueiUCc_fsTY4sB57a04'
    };
  });

  // get all publishers
  describe('get all publishers function', () => {
    test('return all publishers', async () => {
      req.query = {
        sortBy: 'establishment_date',
        sortType: 'asc',
        address: 'all'
      };

      await getAllPublishers(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledTimes(1);
    });
  });

  // delete publisher
  describe('get all publishers function', () => {
    test('return deleted publisher given id', async () => {
      req.params = {
        id: 'fa29e60d-5520-4564-bea3-b51aad29c813'
      };

      await deletePublisher(req, res);

      expect(res.status).toHaveBeenCalledWith(204);
      expect(res.json).toHaveBeenCalledTimes(1);
    });

    test('return bad request error message not given id', async () => {
      req.params = {};

      await deletePublisher(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith(badRequestError('Id is missing'));
    });
  });
});
