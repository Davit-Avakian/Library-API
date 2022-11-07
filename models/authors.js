const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Authors extends Model {
    static associate() {}
  }

  Authors.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
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

      birth_year: {
        type: DataTypes.INTEGER,
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

  return Authors;
};
