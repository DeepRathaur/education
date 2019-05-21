'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('Courses', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            name: {
                type: Sequelize.STRING(255),
                allowNull: false,
                unique: true
            },
            course_category_id: {
                type: Sequelize.INTEGER,
                allowNull: true
              },
              course_for_id: {
                type: Sequelize.INTEGER,
                allowNull: false
              },
            status: {
                type: Sequelize.BOOLEAN,
                allowNull:false,
                defaultValue:1,
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
        return queryInterface.dropTable('Courses');
    }
};