'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('EntranceExams', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING(255),
        allowNull:true
      },
      name: {
        type: Sequelize.STRING(255),
        allowNull:true
      },
      about: {
        type: Sequelize.TEXT,
        allowNull:true
      },
      description: {
        type: Sequelize.TEXT,
        allowNull:true
      },
      status: {
        type: Sequelize.BOOLEAN,
        allowNull:false,
        defaultValue:1
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('EntranceExams');
  }
};