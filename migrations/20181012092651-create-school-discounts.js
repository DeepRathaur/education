'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('SchoolDiscounts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      school_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Schools',
          key: 'id'
      },
      onUpdate: 'cascade',
      onDelete: 'cascade'
      },
      discount: {
        type: Sequelize.DOUBLE,
        allowNull:false
      },
      coupon_code: {
        type: Sequelize.STRING(200),
        allowNull:false,
        unique:true
      },
      is_redeem: {
        type: Sequelize.BOOLEAN,
        allowNull:false,
        defaultValue:0
      },
      expiry_date: {
        type: Sequelize.DATE,
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
    return queryInterface.dropTable('SchoolDiscounts');
  }
};