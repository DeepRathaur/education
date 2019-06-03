'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('whatsnexts', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            title: {
                type: Sequelize.STRING(200),
                allowNull: true
            },
            category_id: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            filepath : {
                type: Sequelize.STRING(200),
                allowNull: true
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
        return queryInterface.dropTable('whatsnexts');
    }
};