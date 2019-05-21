'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('CastCategories', [{
          name: 'SC',
          createdAt: new Date(),
          updatedAt: new Date(),
      }, {
          name: 'ST',
          createdAt: new Date(),
          updatedAt: new Date(),
      }, {
          name: 'OBC',
          createdAt: new Date(),
          updatedAt: new Date(),
      }, {
          name: 'GENERAL',
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
