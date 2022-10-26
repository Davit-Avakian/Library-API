const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Publishers extends Model {
    static associate() {}
  }

  Publishers.init(
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
      },

      address: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: true
        }
      },

      establishment_date: {
        type: DataTypes.DATE,
        validate: {
          notEmpty: true
        }
      },

      private_key: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: true
        }
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

  return Publishers;
};
