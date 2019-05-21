'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('Students', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            name: {
                type: Sequelize.STRING(200),
                allowNull: false,
                comment: ""
            },
            dob: {
                type: Sequelize.STRING(100),
                allowNull: false,
                comment: ""
            },
            gender: {
                type: Sequelize.STRING(32),
                allowNull: false,
                comment: ""
            },
            address: {
                type: Sequelize.TEXT,
                allowNull: false,
                comment: ""
            },
            email1: {
                type: Sequelize.STRING(128),
                allowNull: false,
                unique: true,
                comment: ""
            },
            email2: {
                type: Sequelize.STRING(128),
                allowNull: false,
                unique: true,
                comment: ""
            },
            email3: {
                type: Sequelize.STRING(128),
                allowNull: true,
                comment: ""
            },
            mobile1: {
                type: Sequelize.BIGINT,
                allowNull: false,
                unique: true,
                comment: ""
            },
            mobile2: {
                type: Sequelize.BIGINT,
                allowNull: false,
                unique: true,
                comment: ""
            },
            mobile3: {
                type: Sequelize.BIGINT,
                allowNull: true,
                comment: ""
            },
            password: {
                type: Sequelize.STRING(255),
                allowNull: false,
                comment: ""
            },
            logdate: {
                type: Sequelize.DATE,
                allowNull: true,
                comment: "Login time",
            },
            lognum: {
                type: Sequelize.INTEGER,
                allowNull: true,
                comment: "Total Login time",
            },
            uuid: {
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV1,
            },
            is_active: {
                type: Sequelize.BOOLEAN,
                allowNull: true,
                defaultValue: 1,
                comment: "0 for disable and 1 is active",
            },
            extra: {
                type: Sequelize.TEXT,
                allowNull: true,
                comment: "Extra information of user",
            },
            rp_token: {
                type: Sequelize.TEXT,
                allowNull: true,
                comment: "reset password token",
            },
            rp_token_created_at: {
                type: Sequelize.DATE,
                allowNull: true,
                comment: "reset password token created",
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
        return queryInterface.dropTable('Students');
    }
};