'use strict';
module.exports = (sequelize, DataTypes) => {
    var Alert = sequelize.define('Alert', {
        university_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        campus_id: {
            type: DataTypes.INTEGER
        },
        name: {
            type: DataTypes.STRING(200),
            allowNull: true
        },
        descriptions: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        datefrom: {
            type: DataTypes.DATE,
            allowNull:true
        },
        dateto: {
            type: DataTypes.DATE,
            allowNull:true
        },
        status: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: 1
        },
    }, {});
    Alert.associate = function (models) {
        // associations can be defined here
        this.belongsTo(models.University, {foreignKey: 'university_id', sourceKey: 'id'});
        this.belongsTo(models.Campus, {foreignKey: 'campus_id', sourceKey: 'id'});
        this.Course = this.belongsToMany(models.Course, {through: 'AlertCourse'});
        this.Stream = this.belongsToMany(models.Stream, {through: 'AlertStream'});
        this.State = this.belongsToMany(models.State, {through: 'AlertState'});
    };
    Alert.prototype.toWeb     = function (pw){
        let json    =   this.toJSON();
        return json;
    };
    return Alert;
};