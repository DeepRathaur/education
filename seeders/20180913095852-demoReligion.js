'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Religions', [{
      id: 1,
      name: 'Hinduism',
      status:1,
      createdAt: new Date(),
      updatedAt: new Date(),
  }, {
      id: 2,
      name: 'Christianity',
      status:1,
      createdAt: new Date(),
      updatedAt: new Date(),
  }, {
      id: 3,
      name: 'Buddhism',
      status:1,
      createdAt: new Date(),
      updatedAt: new Date(),
  }
  ], {});
    /*Religion
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
