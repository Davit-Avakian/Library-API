const { internalServerError } = require('../utils/utils');
const { Publishers, Authors } = require('../../models');

exports.getAllPublishers = async (req, res) => {
  try {
    const data = await Publishers.findAll();

    res.status(200).json({ status: 'success', data });
  } catch ({ message }) {
    res.status(500).json({ status: 'error', message });
  }
};

exports.getPublishersByAuthorId = async (req, res) => {
  try {
    const { authorId } = req.params;

    const data = await Publishers.findAll({
      include: [
        {
          model: Authors,
          where: {
            id: authorId
          },
          attributes: []
        }
      ]
    });

    res.status(200).json({ status: 'success', data });
  } catch ({ message }) {
    res.status(500).json(internalServerError(message));
  }
};
