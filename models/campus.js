'use strict';
module.exports = (sequelize, DataTypes) => {
    var Campus = sequelize.define('Campus', {
        university_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        status: {
            type: DataTypes.BOOLEAN,
            defaultValue: 1,
            allowNull: false
        },
    }, {});
    Campus.associate = function (models) {
        // associations can be defined here
        this.belongsTo(models.University, {foreignKey: 'university_id', sourceKey: 'id'});
        this.hasMany(models.UniversityCampusCourse, {foreignKey: 'campus_id', sourceKey: 'id'});
        this.hasMany(models.UnvHowToApply, {foreignKey: 'campus_id', sourceKey: 'id'});
        this.hasMany(models.UnvEligibilityCriteria, {foreignKey: 'campus_id', sourceKey: 'id'});
        this.hasMany(models.UnvExaminationPattern, {foreignKey: 'campus_id', sourceKey: 'id'});
        this.hasMany(models.UnvImportantDate, {foreignKey: 'campus_id', sourceKey: 'id'});
        this.hasMany(models.UnvImportantLink, {foreignKey: 'campus_id', sourceKey: 'id'});
        this.hasMany(models.UnvExaminationCenter, {foreignKey: 'campus_id', sourceKey: 'id'});
        this.hasMany(models.UnvAttachment, {foreignKey: 'campus_id', sourceKey: 'id'});
        this.hasMany(models.Alert, {foreignKey: 'campus_id', sourceKey: 'id'});
    };
    Campus.prototype.toWeb  =   function (pw) {
        let json    =   this.toJSON();
        return json;
    };

    return Campus;
};