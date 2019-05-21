'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('referrals', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      referrer_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        comment: "user who is referring someone else",
        references: {
          model: 'user',
          key: 'id'
        }
      },
      referred_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        comment: "id of person being referred",
        references: {
          model: 'user',
          key: 'id'
        }
      },
      status: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: 1
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
    return queryInterface.dropTable('referrals');
  }
};