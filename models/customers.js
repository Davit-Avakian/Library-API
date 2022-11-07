const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Customers extends Model {
    static associate() {}
  }

  Customers.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        validate: {
          notEmpty: true
        }
      },

      first_name: {
        type: DataTypes.STRING,
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
      },

      profile_id: {
        type: DataTypes.UUID,
        references: {
          model: 'profiles',
          key: 'id'
        }
      }
    },
    { sequelize, underscored: true }
  );

  return Customers;
};
