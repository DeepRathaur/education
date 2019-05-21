'use strict';
module.exports = (sequelize, DataTypes) => {
    var UnvImportantDate = sequelize.define('UnvImportantDate', {
        university_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        campus_id: {
            type: DataTypes.INTEGER,
        },
        title: {
            type: DataTypes.STRING(200),
            allowNull: true
        },
        description: {
            type: DataTypes.TEXT,
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
    UnvImportantDate.associate = function (models) {
        // associations can be defined here
        this.belongsTo(models.University, {foreignKey: 'university_id', sourceKey: 'id'});
        this.belongsTo(models.Campus, {foreignKey: 'campus_id', sourceKey: 'id'});
    };
    UnvImportantDate.prototype.toWeb = function (pw) {
        let json    =   this.toJSON();
        return json;
    };
    return UnvImportantDate;
};