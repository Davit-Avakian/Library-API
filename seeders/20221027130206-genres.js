'use strict';
const { v4: uuidv4 } = require('uuid');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert(
      'genres',
      [
        {
          id: uuidv4(),
          name: 'Detective',
          created_at: new Date(),
          updated_at: new Date()
        },

        {
          id: uuidv4(),
          name: 'Fantasy',
          created_at: new Date(),
          updated_at: new Date()
        }
      ],
      {}
    );
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('genres', null, {});
  }
};
