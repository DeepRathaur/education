'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Schools', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING(255),
        allowNull:false
      },
      contactpersonname: {
        type: Sequelize.STRING(200),
        allowNull:true
      },
      designation: {
        type: Sequelize.STRING(200),
        allowNull:true
      },
      email: {
        type: Sequelize.STRING(200),
        allowNull:true
      },
      mobileno: {
        type: Sequelize.STRING(255),
        allowNull:true
      },
      phoneno: {
        type: Sequelize.STRING(255),
        allowNull:true
      },
      state_id: {
        type: Sequelize.INTEGER,
        allowNull:true
      },
      city_id: {
        type: Sequelize.INTEGER,
        allowNull:true
      },
      address: {
        type: Sequelize.TEXT,
        allowNull:true
      },
      status: {
        type: Sequelize.BOOLEAN,
        allowNull:false,
        defaultValue: 1,
      },
      uuid: {
        type: Sequelize.UUID
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
    return queryInterface.dropTable('Schools');
  }
};