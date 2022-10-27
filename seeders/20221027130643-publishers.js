'use strict';
const { v4: uuidv4 } = require('uuid');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert(
      'publishers',
      [
        {
          id: uuidv4(),
          name: 'publisher1',
          address: 'address1',
          establishment_date: new Date(),
          private_key: 'private-key1',
          profile_id: '7ecffb7f-f77e-47e6-b26f-421b127e63b0',
          created_at: new Date(),
          updated_at: new Date()
        },

        {
          id: uuidv4(),
          name: 'publisher2',
          address: 'address2',
          establishment_date: new Date(),
          private_key: 'private-key2',
          profile_id: '8b58bc09-c7f9-4859-a7e4-8b975346b025',
          created_at: new Date(),
          updated_at: new Date()
        }
      ],
      {}
    );
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('publishers', null, {});
  }
};
