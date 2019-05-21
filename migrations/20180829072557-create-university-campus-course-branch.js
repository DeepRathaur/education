'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('UniversityCampusCourseBranches', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            universitycampuscourse_id: {
                type: Sequelize.INTEGER,
                allowNull:false,
                references: {
                    model: 'UniversityCampusCourses',
                    key: 'id'
                },
                onUpdate: 'cascade',
                onDelete: 'cascade'
            },
            branch_id: {
                type: Sequelize.INTEGER,
                allowNull:false,
                references: {
                    model: 'Branches',
                    key: 'id'
                },
                onUpdate: 'cascade',
                onDelete: 'cascade'
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
        return queryInterface.dropTable('UniversityCampusCourseBranches');
    }
};