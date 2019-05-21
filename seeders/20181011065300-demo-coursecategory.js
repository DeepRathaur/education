'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('CourseCategories', [{
      id: 1,
      name: 'Engineering',
      status: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      id: 2,
      name: 'Diploma in Engineering',
      status: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      id: 3,
      name: 'Management & Business',
      status: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      id: 4,
      name: 'Computers',
      status: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      id: 5,
      name: 'Medical & Health Care',
      status: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      id: 6,
      name: 'Architecture',
      status: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      id: 7,
      name: 'Commerce',
      status: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      id: 8,
      name: 'Science',
      status: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      id: 9,
      name: 'Arts & Humanities',
      status: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      id: 10,
      name: 'Teaching',
      status: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      id: 11,
      name: 'Pharmacy',
      status: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      id: 12,
      name: 'Hotel Management',
      status: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      id: 13,
      name: 'Fashion and Design',
      status: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      id: 14,
      name: 'Mass Communication & Media',
      status: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      id: 15,
      name: 'Travel & Tourism',
      status: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      id: 16,
      name: 'Law',
      status: 1,
      createdAt: new Date(),
      updatedAt: new Date()
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
