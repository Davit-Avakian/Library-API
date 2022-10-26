const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Profile extends Model {
    static associate() {}
  }

  Profile.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
      },

      username: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: true
        }
      },

      email: {
        type: DataTypes.STRING,
        unique: true,
        validate: {
          isEmail: true
        }
      },

      role: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: true
        }
      },

      password: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: true
        }
      }
    },
    { sequelize, underscored: true }
  );

  return Profile;
};
