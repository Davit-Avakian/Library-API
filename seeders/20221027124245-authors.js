'use strict';
const { v4: uuidv4 } = require('uuid');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert(
      'authors',
      [
        {
          id: uuidv4(),
          first_name: 'author1',
          last_name: 'autho1',
          gender: 'male',
          birth_year: 1680,
          created_at: new Date(),
          updated_at: new Date()
        },

        {
          id: uuidv4(),
          first_name: 'author2',
          last_name: 'autho2',
          gender: 'male',
          birth_year: 1880,
          created_at: new Date(),
          updated_at: new Date()
        }
      ],
      {}
    );
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('authors', null, {});
  }
};
