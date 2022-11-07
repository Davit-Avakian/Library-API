const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Publishers_Authors extends Model {
    static associate() {}
  }

  Publishers_Authors.init(
    {
      author_id: {
        type: DataTypes.UUID,
        references: {
          model: 'authors',
          key: 'id'
        }
      },

      publisher_id: {
        type: DataTypes.UUID,
        references: {
          model: 'publishers',
          key: 'id'
        }
      }
    },
    { sequelize, underscored: true }
  );

  return Publishers_Authors;
};
