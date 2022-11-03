const { internalServerError, badRequestError } = require('../utils/utils');
const { Publishers, Authors } = require('../../models');

// get all publishers
exports.getAllPublishers = async (req, res) => {
  const { sortBy, sortType, address, offset } = req.query;

  const sortAndFilter = {
    attributes: ['id', 'name', 'address', 'establishment_date'],

    order: [[sortBy, sortType]],
    offset,
    limit: 8
  };

  if (address !== 'all') {
    sortAndFilter.where = {
      address
    };
  }

  try {
    // find publishers
    const { count, rows: data } = await Publishers.findAndCountAll(sortAndFilter);

    res.status(200).json({ status: 'success', data, count });
  } catch ({ message }) {
    res.status(500).json({ status: 'error', message });
  }
};

// get publisher with author id
exports.getPublishersByAuthorId = async (req, res) => {
  try {
    const { authorId } = req.params;

    // find matching publishers
    const data = await Publishers.findAll({
      attributes: ['id', 'name', 'address', 'establishment_date'],

      include: [
        {
          model: Authors,
          where: {
            id: authorId
          },
          attributes: ['id', 'first_name', 'last_name', 'gender', 'birth_year']
        }
      ]
    });

    res.status(200).json({ status: 'success', data });
  } catch ({ message }) {
    res.status(500).json(internalServerError(message));
  }
};

// delete publisher
exports.deletePublisher = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json(badRequestError('Id is missing'));
    }

    const deletedPublisher = await Publishers.destroy({
      where: {
        id
      }
    });

    return res.status(204).json({ status: 'success', data: deletedPublisher });
  } catch ({ message }) {
    res.status(500).json(internalServerError(message));
  }
};
