const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Genres extends Model {
    static associate() {}
  }

  Genres.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        validate: {
          notEmpty: true
        }
      },

      name: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: true
        }
      }
    },
    { sequelize, underscored: true }
  );

  return Genres;
};
