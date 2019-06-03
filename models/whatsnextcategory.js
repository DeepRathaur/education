'use strict';
module.exports = (sequelize, DataTypes) => {
    const whatsnextcategory = sequelize.define('whatsnextcategory', {
        name: {
            type: DataTypes.STRING(200),
            allowNull: false
        },
        status: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: 1
        },
    }, {});
    whatsnextcategory.associate = function (models) {
        // associations can be defined here
        this.hasMany(models.whatsnext, {foreignKey: 'category_id', sourceKey: 'id'});
    };
    whatsnextcategory.prototype.toWeb = function (pw) {
        let json = this.toJSON();
        return json;
    };
    return whatsnextcategory;
};