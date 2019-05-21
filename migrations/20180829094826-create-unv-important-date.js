'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('UnvImportantDates', {
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
            title: {
                type: Sequelize.STRING(200),
                allowNull: true
            },
            description: {
                type: Sequelize.TEXT,
                allowNull: true
            },
            extra: {
                type: Sequelize.TEXT,
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
        return queryInterface.dropTable('UnvImportantDates');
    }
};