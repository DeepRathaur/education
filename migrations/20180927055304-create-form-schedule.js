'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('FormSchedules', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'user',
          key: 'id'
        },
        onUpdate: 'cascade',
        onDelete: 'cascade'
      },
      booked_for:{
        type: Sequelize.STRING(200),
        allowNull:false
      },
      booked_date: {
        type: Sequelize.DATE,
        allowNull:false
      },
      book_timeslot: {
        type: Sequelize.STRING(200),
        allowNull:false
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
    return queryInterface.dropTable('FormSchedules');
  }
};