'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Coursefors', [{
      name: 'UG',
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      name: 'PG',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'Diploma',
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      name: 'PGD',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'Certificate Course',
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    ], {});
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('Person', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
  }
};
