'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('iticollegetrades', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            text: {
                type: Sequelize.TEXT,
                allowNull: true
            },
            college_id : {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            trade_id : {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            status: {
                type: Sequelize.BOOLEAN,
                defaultValue:1,
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
        return queryInterface.dropTable('iticollegetrades');
    }
};