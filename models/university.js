'use strict';
module.exports = (sequelize, DataTypes) => {
    var University = sequelize.define('University', {
        unvcategory_id : {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        title: {
            type: DataTypes.STRING(128),
            allowNull: true
        },
        name: {
            type: DataTypes.STRING(200),
            allowNull: false
        },
        introduction: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        about: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        website_url : {
            type: DataTypes.STRING(200),
            allowNull: true
        },
        state_id : {
            type: DataTypes.INTEGER,
            allowNull: false 
        },
        city_id : {
            type: DataTypes.INTEGER,
            allowNull: false 
        },
        date_of_establishment : {
            type: DataTypes.DATEONLY,
            allowNull: true 
        },
        status: {
            type: DataTypes.BOOLEAN,
            defaultValue: 1,
            allowNull: false
        },
    }, {});
    University.associate = function (models) {
        // associations can be defined here
        this.hasMany(models.Campus, {foreignKey: 'university_id', sourceKey: 'id'});
        this.hasMany(models.UniversityCampusCourse, {foreignKey: 'university_id', sourceKey: 'id'});
        this.hasMany(models.UnvHowToApply, {foreignKey: 'university_id', sourceKey: 'id'});
        this.hasMany(models.UnvEligibilityCriteria, {foreignKey: 'university_id', sourceKey: 'id'});
        this.hasMany(models.UnvExaminationPattern, {foreignKey: 'university_id', sourceKey: 'id'});
        this.hasMany(models.UnvImportantDate, {foreignKey: 'university_id', sourceKey: 'id'});
        this.hasMany(models.UnvImportantLink, {foreignKey: 'university_id', sourceKey: 'id'});
        this.hasMany(models.UnvExaminationCenter, {foreignKey: 'university_id', sourceKey: 'id'});
        this.hasMany(models.UnvAttachment, {foreignKey: 'university_id', sourceKey: 'id'});
        this.hasMany(models.Alert, {foreignKey: 'university_id', sourceKey: 'id'});
        this.belongsTo(models.UnversityCategory,  {foreignKey: 'unvcategory_id',   targetKey: 'id'});
        this.belongsTo(models.City,  {foreignKey: 'city_id',   targetKey: 'id'});
        this.belongsTo(models.State,  {foreignKey: 'state_id',   targetKey: 'id'});
    };

    University.prototype.toWeb  =   function (pw) {
        let json    =   this.toJSON();
        return json;
    }
    return University;
};