'use strict';
const { v4: uuidv4 } = require('uuid');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert(
      'profiles',
      [
        {
          id: uuidv4(),
          username: 'publisher',
          email: 'publisher@gmail.com',
          role: 'publisher',
          password: 'publisher',
          created_at: new Date(),
          updated_at: new Date()
        },

        {
          id: uuidv4(),
          username: 'customer',
          email: 'customer@gmail.com',
          role: 'customer',
          password: 'customer',
          created_at: new Date(),
          updated_at: new Date()
        }
      ],
      {}
    );
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('profiles', null, {});
  }
};
