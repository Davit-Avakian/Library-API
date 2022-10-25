const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Genres extends Model {
    static associate() {}
  }

  Genres.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
        validate: {
          notEmpty: true
        }
      },

      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true
        }
      }
    },
    { sequelize, underscored: true }
  );

  return Genres;
};
