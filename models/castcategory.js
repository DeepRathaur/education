'use strict';
module.exports = (sequelize, DataTypes) => {
    var CastCategory = sequelize.define('CastCategory', {
        name: {
            type: DataTypes.STRING(128),
            allowNull: false,
            unique: true
        },
        status: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: 1
        },
    }, {});
    CastCategory.associate = function (models) {
        // associations can be defined here
        this.hasMany(models.User, {foreignKey: 'castcat_id', sourceKey: 'id'});
    };

    CastCategory.prototype.toWeb = function (pw) {
        let json = this.toJSON();
        return json;
    };


    return CastCategory;
};