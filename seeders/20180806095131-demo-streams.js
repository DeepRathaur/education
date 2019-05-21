'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('Streams', [{
          name: 'Commerce',
          createdAt: new Date(),
          updatedAt: new Date(),
      }, {
          name: 'Science',
          createdAt: new Date(),
          updatedAt: new Date(),
      }, {
          name: 'Arts',
          createdAt: new Date(),
          updatedAt: new Date(),
      }, {
          name: 'Humanities',
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
