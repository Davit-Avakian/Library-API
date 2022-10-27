'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert(
      'publishers__authors',
      [
        {
          author_id: '35383128-f444-434d-a12f-4240a2027797',

          publisher_id: 'f250dc8d-a019-49f0-bf05-d23d7ba0094f',

          created_at: new Date(),
          updated_at: new Date()
        },

        {
          author_id: 'd8e37050-eda1-4ec0-940a-4a747e27c9c9',

          publisher_id: '9ab110ff-bb34-49ce-9c9c-a5fe83ee6918',

          created_at: new Date(),
          updated_at: new Date()
        }
      ],
      {}
    );
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('publishers__authors', null, {});
  }
};
