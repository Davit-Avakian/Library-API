'use strict';
const { v4: uuidv4 } = require('uuid');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert(
      'customers',
      [
        {
          id: uuidv4(),

          first_name: 'customer1',

          last_name: 'customer1',

          gender: 'female',

          age: 30,

          created_at: new Date(),
          updated_at: new Date()
        },

        {
          id: uuidv4(),

          first_name: 'customer2',

          last_name: 'customer2',

          gender: 'male',

          age: 21,

          created_at: new Date(),
          updated_at: new Date()
        }
      ],
      {}
    );
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('customers', null, {});
  }
};
