'use strict';
module.exports = (sequelize, DataTypes) => {
    var UnvExaminationCenter = sequelize.define('UnvExaminationCenter', {
        university_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        campus_id: {
            type: DataTypes.INTEGER,
        },
        state_id: {
            type: DataTypes.INTEGER,
        },
        text: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        status: {
            type: DataTypes.BOOLEAN,
            defaultValue: 1,
            allowNull: false
        },
    }, {});
    UnvExaminationCenter.associate = function (models) {
        // associations can be defined here
        this.belongsTo(models.University, {foreignKey: 'university_id', sourceKey: 'id'});
        this.belongsTo(models.Campus, {foreignKey: 'campus_id', sourceKey: 'id'});
        this.belongsTo(models.State, {foreignKey: 'state_id', sourceKey: 'id'});
    };
    UnvExaminationCenter.prototype.toWeb   =   function (pw) {
        let json    =  this.toJSON();
        return json;
    }
    return UnvExaminationCenter;
};