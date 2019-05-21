'use strict';
module.exports = (sequelize, DataTypes) => {
    var UniversityCampusCourseBranch = sequelize.define('UniversityCampusCourseBranch', {
        universitycampuscourse_id: {
            type: DataTypes.INTEGER,
            allowNull:false
        },
        course_id: {
            type: DataTypes.INTEGER,
            allowNull:false
        },
        branch_id: {
            type: DataTypes.INTEGER,
            allowNull:false
        },
    }, {});
    UniversityCampusCourseBranch.associate = function(models) {
        // associations can be defined here
        this.belongsTo(models.UniversityCampusCourse, {foreignKey: 'universitycampuscourse_id', sourceKey: 'id'});
        this.belongsTo(models.Branch, {foreignKey: 'branch_id', sourceKey: 'id'});
        this.belongsTo(models.Course, {foreignKey: 'course_id', sourceKey: 'id'});
    };
    UniversityCampusCourseBranch.prototype.toWeb  = function (pw) {
        let json  = this.toJSON();
        return json;
    };

    return UniversityCampusCourseBranch;
};