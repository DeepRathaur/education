'use strict';
module.exports = (sequelize, DataTypes) => {
    var Subject = sequelize.define('Subject', {
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
    Subject.associate = function (models) {
        // associations can be defined here
        this.hasMany(models.SubjectClass,{foreignKey:'SubjectId'});
        this.hasMany(models.SubjectStream,{foreignKey:'SubjectId'});
    };
    Subject.prototype.toWeb = function (pw) {
        let json = this.toJSON();
        return json;
    };
    return Subject;
};