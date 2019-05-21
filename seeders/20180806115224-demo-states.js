'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('States', [{
          name: 'Andhra Pradesh',
          zone:'B',
          createdAt: new Date(),
          updatedAt: new Date(),
      }, {
          name: 'Andaman & Nicobar Islands',
          zone:'B',
          createdAt: new Date(),
          updatedAt: new Date(),
      }], {});
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
