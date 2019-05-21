'use strict';
module.exports = (sequelize, DataTypes) => {
    var State = sequelize.define('State', {
        name: {
            type: DataTypes.STRING(200),
            allowNull: false,
            unique: true
        },
        zone: {
            type: DataTypes.STRING(20),
            allowNull: true
        },
    }, {});
    State.associate = function (models) {
        // associations can be defined here
        //this.Users = this.belongsToMany(models.User, {through: 'UserPreferedStates', as: 'userstates', foreignKey:'state_id'});
        this.hasMany(models.UserPreferedStates,{foreignKey:'state_id'});
        this.hasMany(models.UnvExaminationCenter, {foreignKey: 'state_id', sourceKey: 'id'});
        this.hasMany(models.University, {foreignKey: 'state_id', sourceKey: 'id'});
        this.hasMany(models.City, {foreignKey: 'state_id', sourceKey: 'id'});
        this.hasMany(models.Schools, {foreignKey: 'state_id', sourceKey: 'id'});
        this.hasMany(models.User, {foreignKey: 'state_id', sourceKey: 'id'});
        this.hasMany(models.iticollege, {foreignKey: 'state_id', sourceKey: 'id'});
        this.Alert = this.belongsToMany(models.Alert, {through: 'AlertState'});
    };

    State.prototype.toWeb = function (pw) {
        let json = this.toJSON();
        return json;
    };
    return State;
};