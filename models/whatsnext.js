'use strict';
module.exports = (sequelize, DataTypes) => {
    const whatsnext = sequelize.define('whatsnext', {
        title: {
            type: DataTypes.STRING(200),
            allowNull: true
        },
        category_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        filepath: {
            type: DataTypes.STRING(200),
            allowNull: true
        },
        status: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: 1
        },
    }, {});
    whatsnext.associate = function (models) {
        // associations can be defined here
        this.belongsTo(models.whatsnextcategory, {foreignKey: 'category_id', sourceKey: 'id'});
    };
    whatsnext.prototype.toWeb = function (pw) {
        let json = this.toJSON();
        return json;
    };
    return whatsnext;
};