const { internalServerError } = require('../utils/utils');
const { Publishers } = require('../../models');
const { Op } = require('sequelize');

exports.getPublishersByAuthorId = async (req, res) => {
  try {
    const { authorId } = req.params;

    const data = await Publishers.findAll({
      where: {
        authors_ids: {
          [Op.contains]: [authorId]
        }
      }
    });

    res.status(200).json({ status: 'success', data });
  } catch ({ message }) {
    res.status(500).json(internalServerError(message));
  }
};
