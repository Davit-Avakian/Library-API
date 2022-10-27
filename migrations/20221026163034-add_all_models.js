'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('authors', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
      },

      first_name: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notEmpty: true
        }
      },

      last_name: {
        type: Sequelize.STRING,
        validate: {
          notEmpty: true
        }
      },

      gender: {
        type: Sequelize.STRING,
        validate: {
          notEmpty: true
        }
      },

      birth_year: {
        type: Sequelize.INTEGER,
        validate: {
          notEmpty: true
        }
      },

      profile_id: {
        type: Sequelize.UUID,
        references: {
          model: 'profiles',
          key: 'id'
        }
      }
    });

    await queryInterface.createTable('books', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        validate: {
          notEmpty: true
        }
      },

      title: {
        type: Sequelize.STRING,
        validate: {
          notEmpty: true
        }
      },

      author_id: {
        type: Sequelize.UUID,
        validate: {
          notEmpty: true
        },
        references: {
          model: 'authors',
          key: 'id'
        }
      },

      co_author_id: {
        type: Sequelize.UUID,
        validate: {
          notEmpty: true
        },
        references: {
          model: 'authors',
          key: 'id'
        }
      },

      publisher_id: {
        type: Sequelize.UUID,
        validate: {
          notEmpty: true
        },
        references: {
          model: 'publishers',
          key: 'id'
        }
      },

      publish_date: {
        type: Sequelize.DATE,
        validate: {
          notEmpty: true
        }
      },

      rating: {
        type: Sequelize.INTEGER,
        validate: {
          notEmpty: true
        }
      },

      genre_id: {
        type: Sequelize.UUID,
        validate: {
          notEmpty: true
        },
        references: {
          model: 'genres',
          key: 'id'
        }
      }
    });

    await queryInterface.createTable('customers', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        validate: {
          notEmpty: true
        }
      },

      first_name: {
        type: Sequelize.STRING,
        validate: {
          notEmpty: true
        }
      },

      last_name: {
        type: Sequelize.STRING,
        validate: {
          notEmpty: true
        }
      },

      gender: {
        type: Sequelize.STRING,
        validate: {
          notEmpty: true
        }
      },

      age: {
        type: Sequelize.INTEGER
      },

      profile_id: {
        type: Sequelize.UUID,
        references: {
          model: 'profiles',
          key: 'id'
        }
      }
    });

    await queryInterface.createTable('genres', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        validate: {
          notEmpty: true
        }
      },

      name: {
        type: Sequelize.STRING,
        validate: {
          notEmpty: true
        }
      },

      book_id: {
        type: Sequelize.UUID,
        references: {
          model: 'books',
          key: 'id'
        }
      }
    });

    await queryInterface.createTable('profiles', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
      },

      username: {
        type: Sequelize.STRING,
        validate: {
          notEmpty: true
        }
      },

      email: {
        type: Sequelize.STRING,
        unique: true,
        validate: {
          isEmail: true
        }
      },

      role: {
        type: Sequelize.STRING,
        validate: {
          notEmpty: true
        }
      },

      password: {
        type: Sequelize.STRING,
        validate: {
          notEmpty: true
        }
      }
    });

    await queryInterface.createTable('publishers_authors', {
      author_id: {
        type: Sequelize.UUID,
        references: {
          model: 'authors',
          key: 'id'
        }
      },

      publisher_id: {
        type: Sequelize.UUID,
        references: {
          model: 'publishers',
          key: 'id'
        }
      }
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('authors');

    await queryInterface.dropTable('books');

    await queryInterface.dropTable('customers');

    await queryInterface.dropTable('genres');

    await queryInterface.dropTable('profiles');

    await queryInterface.dropTable('publishers');

    await queryInterface.dropTable('publishers_authors');
  }
};
