const { Model } = require('sequelize');

module.exports = (sequelize) => {
  class Publishers_Authors extends Model {
    static associate() {}
  }

  Publishers_Authors.init({}, { sequelize, underscored: true });

  return Publishers_Authors;
};
