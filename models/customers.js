const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Customers extends Model {
    static associate() {}
  }

  Customers.init(
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
        validate: {
          notEmpty: true
        }
      },

      gender: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: true
        }
      },

      age: {
        type: DataTypes.INTEGER
      }
    },
    { sequelize, underscored: true }
  );

  return Customers;
};
