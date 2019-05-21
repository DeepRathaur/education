'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('iticolleges', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            code: {
                type: Sequelize.STRING(200),
                allowNull: false,
                unique: true
            },
            name: {
                type: Sequelize.STRING(200),
                allowNull:false
            },
            type: {
                type: Sequelize.STRING(200),
                allowNull:true // Private or Government
            },
            location: {
                type: Sequelize.STRING(200),
                allowNull:true  //Rural or urban
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
            seats: {
                type: Sequelize.INTEGER,
                allowNull:true
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
        return queryInterface.dropTable('iticolleges');
    }
};