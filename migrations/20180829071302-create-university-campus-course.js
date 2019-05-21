'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('UniversityCampusCourses', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            university_id: {
                type: Sequelize.INTEGER,
                allowNull:false,
                references: {
                    model: 'universities',
                    key: 'id'
                },
                onUpdate: 'cascade',
                onDelete: 'cascade'
            },
            campus_id: {
                type: Sequelize.INTEGER,
                allowNull:false,
                references: {
                    model: 'campuses',
                    key: 'id'
                },
                onUpdate: 'cascade',
                onDelete: 'cascade'
            },
            course_id: {
                type: Sequelize.INTEGER,
                allowNull:false,
                references: {
                    model: 'courses',
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
        return queryInterface.dropTable('UniversityCampusCourses');
    }
};