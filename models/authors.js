const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Authors extends Model {
    static associate() {}
  }

  Authors.init(
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

      first_name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true
        }
      },

      last_name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true
        }
      },

      gender: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true
        }
      },

      birth_year: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: true
        }
      }
    },
    { sequelize, underscored: true }
  );

  return Authors;
};
