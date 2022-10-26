const { internalServerError } = require('#utils');
const { Publishers, Authors } = require('#models');

// get all publishers
exports.getAllPublishers = async (req, res) => {
  try {
    // find publishers
    const data = await Publishers.findAll({
      attributes: ['id', 'name', 'address', 'establishment_date']
    });

    res.status(200).json({ status: 'success', data });
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
