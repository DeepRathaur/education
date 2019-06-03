'use strict';
module.exports = (sequelize, DataTypes) => {
    const careerglance = sequelize.define('careerglance', {
        title: {
            type: DataTypes.STRING(200),
            allowNull: true
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
    careerglance.associate = function (models) {
        // associations can be defined here
    };
    careerglance.prototype.toWeb = function (pw) {
        let json = this.toJSON();
        return json;
    };
    return careerglance;
};