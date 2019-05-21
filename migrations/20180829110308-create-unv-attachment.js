'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('UnvAttachments', {
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
            type: {
                type: Sequelize.STRING(150),
                allowNull:false
            },
            attachment_uri: {
                type: Sequelize.STRING(200),
                allowNull:true
            },
            extra: {
                type: Sequelize.TEXT,
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
        return queryInterface.dropTable('UnvAttachments');
    }
};