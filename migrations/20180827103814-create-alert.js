'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('Alerts', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            university_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'universities',
                    key: 'id'
                },
                onUpdate: 'cascade',
                onDelete: 'cascade'
            },
            campus_id: {
                type: Sequelize.INTEGER,
                references: {
                    model: 'campuses',
                    key: 'id'
                },
                onUpdate: 'cascade',
                onDelete: 'cascade'
            },
            name: {
                type: Sequelize.STRING(200),
                allowNull: true
            },
            descriptions: {
                type: Sequelize.TEXT,
                allowNull: true
            },
            datefrom: {
                type: Sequelize.DATE,
                allowNull:true
            },
            dateto: {
                type: Sequelize.DATE,
                allowNull:true
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
        return queryInterface.dropTable('Alerts');
    }
};