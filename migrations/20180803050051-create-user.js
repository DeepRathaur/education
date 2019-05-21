'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('Users', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            role_id: {
                type: Sequelize.INTEGER,
                references: {
                    model: 'role',
                    key: 'id',
                },
                allowNull:false
            },
            religion_id: {
                type: Sequelize.INTEGER,
                references: {
                    model: 'religion',
                    key: 'id',
                },
                allowNull:false
            },
            board_id: {
                type: Sequelize.INTEGER,
                references: {
                    model: 'board',
                    key: 'id',
                },
                allowNull:false
            },
            stream_id: {
                type: Sequelize.INTEGER,
                references: {
                    model: 'stream',
                    key: 'id',
                },
                allowNull:false
            },
            course_id: {
                type: Sequelize.INTEGER,
                references: {
                    model: 'course',
                    key: 'id',
                },
                allowNull:false
            },
            class_id: {
                type: Sequelize.INTEGER,
                references: {
                    model: 'class',
                    key: 'id',
                },
                allowNull:false
            },
            castcat_id: {
                type: Sequelize.INTEGER,
                references: {
                    model: 'castcategory',
                    key: 'id',
                },
                allowNull:false
            },
            state_id: {
                type: Sequelize.INTEGER,
                references: {
                    model: 'States',
                    key: 'id',
                },
                allowNull:false
            },
            city_id: {
                type: Sequelize.INTEGER,
                references: {
                    model: 'Cities',
                    key: 'id',
                },
                allowNull:false
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
                unique:true,
                comment: ""
            },
            email2: {
                type: Sequelize.STRING(128),
                allowNull: false,
                unique:true,
                comment: ""
            },
            email3: {
                type: Sequelize.STRING(128),
                allowNull: true,
                defaultValue:null,
                comment: ""
            },
            mobile1: {
                type: Sequelize.BIGINT,
                allowNull: false,
                unique:true,
                comment: ""
            },
            mobile2: {
                type: Sequelize.BIGINT,
                allowNull: false,
                unique:true,
                comment: ""
            },
            mobile3: {
                type: Sequelize.BIGINT,
                allowNull: true,
                defaultValue:null,
                comment: ""
            },
            password: {
                type: Sequelize.STRING(255),
                allowNull: false,
                comment: ""
            },
            score_inper: {
                type: Sequelize.INTEGER,
                allowNull: true,
            },
            school_name: {
                type: Sequelize.STRING(200),
                allowNull: true,
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
            user_type: {
                type: Sequelize.STRING(200),
                allowNull: true,
                defaultValue: 'free',
                comment: "Free for disable and Premium is active",
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
            referral_code: {
                type: Sequelize.STRING(200),
                allowNull: true,
                comment: "rreferral code created",
            },
            profile_picture: {
                type: Sequelize.STRING(255),
                allowNull: true,
                comment: "Profile picture",
            },
            otp: {
                type: Sequelize.STRING(100),
                allowNull: true,
                comment: "OTP",
            },
            otp_verified: {
                type: Sequelize.BOOLEAN,
                allowNull: false,
                defaultValue:0
            },
            otp_created_at: {
                type: Sequelize.DATE,
                allowNull: true,
                comment: "OTP created",
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
        return queryInterface.dropTable('Users');
    }
};