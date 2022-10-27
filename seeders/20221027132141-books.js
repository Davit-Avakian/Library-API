'use strict';
const { v4: uuidv4 } = require('uuid');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert(
      'books',
      [
        {
          id: uuidv4(),

          title: 'book1',

          author_id: '35383128-f444-434d-a12f-4240a2027797',

          co_author_id: 'd8e37050-eda1-4ec0-940a-4a747e27c9c9',

          publisher_id: 'f250dc8d-a019-49f0-bf05-d23d7ba0094f',

          publish_date: new Date(),

          rating: 7,

          genre_id: '592c0d44-c2f3-4c78-8467-ddcc3a00a587'
        },

        {
          id: uuidv4(),

          title: 'book2',
          author_id: 'd8e37050-eda1-4ec0-940a-4a747e27c9c9',

          co_author_id: '35383128-f444-434d-a12f-4240a2027797',

          publisher_id: '9ab110ff-bb34-49ce-9c9c-a5fe83ee6918',

          publish_date: new Date(),

          rating: 9,

          genre_id: '57e49f72-d743-4081-ba5a-362af1bdf174'
        }
      ],
      {}
    );
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('books', null, {});
  }
};
