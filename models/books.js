const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Books extends Model {
    static associate() {}
  }

  Books.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        validate: {
          notEmpty: true
        }
      },

      title: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: true
        }
      },

      author_id: {
        type: DataTypes.UUID,
        validate: {
          notEmpty: true
        },
        references: {
          model: 'authors',
          key: 'id'
        }
      },

      co_author_id: {
        type: DataTypes.UUID,
        validate: {
          notEmpty: true
        },
        references: {
          model: 'authors',
          key: 'id'
        }
      },

      publisher_id: {
        type: DataTypes.UUID,
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
        validate: {
          notEmpty: true
        }
      },

      rating: {
        type: DataTypes.INTEGER,
        validate: {
          notEmpty: true
        }
      },

      genre_ids: {
        type: DataTypes.ARRAY(DataTypes.UUID)
      }
    },
    { sequelize, underscored: true, timestamps: false, createdAt: false }
  );

  return Books;
};
