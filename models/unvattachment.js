'use strict';
module.exports = (sequelize, DataTypes) => {
    var UnvAttachment = sequelize.define('UnvAttachment', {
        university_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        campus_id: {
            type: DataTypes.INTEGER,
        },
        name: {
            type: DataTypes.STRING(200),
            allowNull: true
        },
        type: {
            type: DataTypes.STRING(150),
            allowNull: false
        },
        attachment_uri: {
            type: DataTypes.STRING(200),
            allowNull: true
        },
        extra: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        status: {
            type: DataTypes.BOOLEAN,
            defaultValue: 1,
            allowNull: false
        },
    }, {});
    UnvAttachment.associate = function (models) {
        // associations can be defined here
        this.belongsTo(models.University, {foreignKey: 'university_id', sourceKey: 'id'});
        this.belongsTo(models.Campus, {foreignKey: 'campus_id', sourceKey: 'id'});
    };
    UnvAttachment.prototype.toWeb = function (pw) {
        let json    =   this.toJSON();
        return json;
    };

    return UnvAttachment;
};