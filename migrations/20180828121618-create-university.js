'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('Universities', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            unvcategory_id : {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            title: {
                type: Sequelize.STRING(128),
                allowNull: true
            },
            name: {
                type: Sequelize.STRING(200),
                allowNull: false
            },
            introduction: {
                type: Sequelize.TEXT,
                allowNull: true
            },
            about: {
                type: Sequelize.TEXT,
                allowNull: true
            },
            website_url : {
                type: Sequelize.STRING(200),
                allowNull: true
            },
            state_id : {
                type: Sequelize.INTEGER,
                allowNull: false 
            },
            city_id : {
                type: Sequelize.INTEGER,
                allowNull: false 
            },
            date_of_establishment : {
                type: Sequelize.DATEONLY,
                allowNull: true 
            },
            status: {
                type: Sequelize.BOOLEAN,
                defaultValue: 1,
                allowNull: false
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
        return queryInterface.dropTable('Universities');
    }
};