'use strict';
const bcrypt 			= require('bcrypt');
const bcrypt_p 			= require('bcrypt-promise');
const jwt           	= require('jsonwebtoken');
const {TE, to}          = require('../services/util.service');
const PARAMS            = require('../config/globalparam');


module.exports = (sequelize, DataTypes) => {
    var User = sequelize.define('User', {
        role_id: {
            type: DataTypes.INTEGER,
            defaultValue: PARAMS.userRoles.user,
            allowNull:false
        },
        religion_id:{
            type: DataTypes.INTEGER,
            allowNull:false
        },
        board_id: {
            type: DataTypes.INTEGER,
            allowNull:false
        },
        stream_id: {
            type: DataTypes.INTEGER,
            allowNull:true
        },
        course_id: {
            type: DataTypes.INTEGER,
            allowNull:false
        },
        class_id: {
            type: DataTypes.INTEGER,
            allowNull:false
        },
        castcat_id: {
            type: DataTypes.INTEGER,
            allowNull:false
        },
        state_id: {
            type: DataTypes.INTEGER,
            allowNull:false
        },
        city_id: {
            type: DataTypes.INTEGER,
            allowNull:false
        },
        name: {
            type: DataTypes.STRING(200),
            allowNull: false,
            comment: "",
        },
        dob: {
            type: DataTypes.STRING(100),
            allowNull: false,
            comment: "",
        },
        gender: {
            type: DataTypes.STRING(32),
            allowNull: false,
            comment: "",
        },
        address: {
            type: DataTypes.TEXT,
            allowNull: false,
            comment: "",
        },
        email1: {
            type: DataTypes.STRING(128),
            allowNull: false,
            unique: true,
            validate: {isEmail: {msg: "Email is invalid."}}
        },
        email2: {
            type: DataTypes.STRING(128),
            allowNull: false,
            unique: true,
            validate: {isEmail: {msg: "Email is invalid."}}
        },
        email3: {
            type: DataTypes.STRING(128),
            allowNull: true,
            defaultValue:null
            // unique: true,
            // validate: {isEmail: {msg: "Email is invalid."}}
        },
        mobile1: {
            type: DataTypes.BIGINT,
            allowNull: false,
            unique: true,
            validate: {
                len: {args: [7, 20], msg: "Mobile number invalid, too short."},
                isNumeric: {msg: "not a valid phone number."}
            }
        },
        mobile2: {
            type: DataTypes.BIGINT,
            allowNull: false,
            unique: true,
            validate: {
                len: {args: [7, 20], msg: "Mobile number invalid, too short."},
                isNumeric: {msg: "not a valid phone number."}
            }
        },
        mobile3: {
            type: DataTypes.BIGINT,
            allowNull: true,
            defaultValue:null
        },
        password: {type: DataTypes.STRING, allowNull: false},
        score_inper: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        school_name: {
            type: DataTypes.STRING(200),
            allowNull: true,
        },
        logdate: {
            type: DataTypes.DATE,
            allowNull: true,
            comment: "Login time",
        },
        lognum: {
            type: DataTypes.INTEGER,
            allowNull: true,
            comment: "Total Login time",
        },
        uuid: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV1,
        },
        is_active: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
            defaultValue: 0,
            comment: "0 for disable and 1 is active",
        },
        user_type: {
            type: DataTypes.STRING(200),
            allowNull: true,
            defaultValue: 'free',
            comment: "Free for disable and Premium is active",
        },
        extra: {
            type: DataTypes.TEXT,
            allowNull: true,
            comment: "Extra information of user",
        },
        rp_token: {
            type: DataTypes.TEXT,
            allowNull: true,
            comment: "reset password token",
        },
        rp_token_created_at: {
            type: DataTypes.DATE,
            allowNull: true,
            comment: "reset password token created",
        },
        referral_code: {
            type: DataTypes.STRING(200),
            allowNull: true,
            comment: "rreferral code created",
        },
        profile_picture: {
            type: DataTypes.STRING(255),
            allowNull: true,
            comment: "Profile picture",
        },
        otp: {
            type: DataTypes.STRING(100),
            allowNull: true,
            comment: "OTP",
        },
        otp_verified: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue:0
        },
        otp_created_at: {
            type: DataTypes.DATE,
            allowNull: true,
            comment: "OTP created",
        },
    }, {comment : "User Table"});
    User.associate = function (models) {
        // associations can be defined here
        this.belongsTo(models.Role,  {foreignKey: 'role_id',   sourceKey: 'id'});
        this.belongsTo(models.Religion,  {foreignKey: 'religion_id',   sourceKey: 'id'});
        this.belongsTo(models.Board, {foreignKey: 'board_id',  sourceKey: 'id'});
        this.belongsTo(models.Stream,{foreignKey: 'stream_id', sourceKey: 'id'});
        this.belongsTo(models.Course,{foreignKey: 'course_id', sourceKey: 'id'});
        this.belongsTo(models.Class,{foreignKey:  'class_id', sourceKey: 'id'});
        this.belongsTo(models.CastCategory,{foreignKey: 'castcat_id', sourceKey: 'id'});
        this.belongsTo(models.State,{foreignKey: 'state_id', sourceKey: 'id'});
        this.belongsTo(models.City,{foreignKey: 'city_id', sourceKey: 'id'});
        this.hasMany(models.FormSchedule, {foreignKey: 'user_id', sourceKey: 'id'});
        this.hasMany(models.UserPreferedStates,{foreignKey:'user_id'});
        this.hasMany(models.UsreSubject,{foreignKey:'user_id'});
        this.hasMany(models.referrals,{foreignKey:'referrer_id'});
    }; 

    User.beforeSave(async (user, options) => {
        let err;
        if (user.changed('password')){
            let salt, hash
            [err, salt] = await to(bcrypt.genSalt(10));
            if(err) TE(err.message, true);

            [err, hash] = await to(bcrypt.hash(user.password, salt));
            if(err) TE(err.message, true);

            user.password = hash;
        }
    });

    User.prototype.comparePassword = async function (pw) {
        let err, pass
        if(!this.password) TE('password not set');

        [err, pass] = await to(bcrypt_p.compare(pw, this.password));
        if(err) TE(err);

        if(!pass) TE('invalid password');

        return this;
    }

    User.prototype.getJWT = function () {
        let expiration_time = parseInt(PARAMS.jwt_expiration);
        return "Bearer "+jwt.sign({user_id:this.id}, PARAMS.jwt_encryption, {expiresIn: expiration_time});
    };

    User.prototype.toWeb = function (pw) {
        let json = this.toJSON();
        return json;
    };
    return User;
};