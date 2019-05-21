'use strict';
module.exports = (sequelize, DataTypes) => {
    var UsreSubject = sequelize.define('UsreSubject', {
        text: DataTypes.STRING
    }, {});
    UsreSubject.associate = function (models) {
        // associations can be defined here
        this.belongsTo(models.Subject, {foreignKey: 'subject_id', sourceKey: 'id'});
        this.belongsTo(models.User, {foreignKey: 'user_id', sourceKey: 'id'});
    };
    return UsreSubject;
};