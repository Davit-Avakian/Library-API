const { internalServerError } = require('#utils');
const { Genres } = require('#models');

exports.getAllGenres = async (req, res) => {
  try {
    const data = await Genres.findAll();

    res.status(200).json({ status: 'success', data });
  } catch (error) {
    res.status(500).json(internalServerError(error.message));
  }
};
