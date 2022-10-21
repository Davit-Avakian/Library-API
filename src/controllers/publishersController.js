const client = require('../../config/connection');
const { internalServerError } = require('../utils/utils');

exports.getPublishersByAuthorId = async (req, res) => {
  try {
    const { authorId } = req.params;

    const { rows } = await client.query(
      `SELECT * FROM publishers WHERE author_ids @> ARRAY[${authorId}]::int[]`
    );

    res.status(200).json({ status: 'success', data: rows });
  } catch ({ message }) {
    res.status(500).json(internalServerError(message));
  }
};
