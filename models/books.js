const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Books extends Model {
    static associate() {}
  }

  Books.init(
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

      title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true
        }
      },

      author_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: true
        },
        references: {
          model: 'authors',
          key: 'id'
        }
      },

      co_author_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: true
        },
        references: {
          model: 'authors',
          key: 'id'
        }
      },

      publisher_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: true
        },
        references: {
          model: 'publishers',
          key: 'id'
        }
      },

      publish_date: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
          notEmpty: true
        }
      },

      rating: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: true
        }
      },

      genre: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true
        }
      }
    },
    { sequelize, underscored: true, timestamps: false, createdAt: false }
  );

  return Books;
};
