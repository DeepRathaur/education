'use strict';
module.exports = (sequelize, DataTypes) => {
    var Role = sequelize.define('Role', {
        name: {
            type: DataTypes.STRING(100),
            allowNull: false,
            unique: true
        },
        status: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: 1
        },
    }, {});
    Role.associate = function (models) {
        // associations can be defined here
        this.hasMany(models.User, {foreignKey: 'role_id', sourceKey: 'id'});
    };

    Role.prototype.toWeb    =   function (pw) {
        let json    =   this.toJSON();
        return json;
    }

    return Role;
};