'use strict';
module.exports = (sequelize, DataTypes) => {
    const iticollege = sequelize.define('iticollege', {
        code: {
            type: DataTypes.STRING(200),
            allowNull: false,
            unique: true
        },
        name: {
            type: DataTypes.STRING(200),
            allowNull: false
        },
        type: {
            type: DataTypes.STRING(200),
            allowNull: true // Private or Government
        },
        location: {
            type: DataTypes.STRING(200),
            allowNull: true  //Rural or urban
        },
        state_id: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        city_id: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        address: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        seats: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        status: {
            type: DataTypes.BOOLEAN,
            defaultValue: 1,
            allowNull: false
        },
    }, {});
    iticollege.associate = function (models) {
        // associations can be defined here
        this.belongsTo(models.City,  {foreignKey: 'city_id',   targetKey: 'id'});
        this.belongsTo(models.State,  {foreignKey: 'state_id',   targetKey: 'id'});
        this.hasMany(models.iticollegetrade,  {foreignKey: 'college_id',   targetKey: 'id'});
    };
    iticollege.prototype.toWeb   =   function (pw) {
        let json    =   this.toJSON();
        return json;
    };
    return iticollege;
};