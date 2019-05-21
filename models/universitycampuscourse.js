'use strict';
module.exports = (sequelize, DataTypes) => {
  var UniversityCampusCourse = sequelize.define('UniversityCampusCourse', {
      university_id: {
          type: DataTypes.INTEGER,
          allowNull:false
      },
      campus_id: {
          type: DataTypes.INTEGER,
          allowNull:false
      },
      course_id: {
          type: DataTypes.INTEGER,
          allowNull:false
      },
  }, {});
  UniversityCampusCourse.associate = function(models) {
    // associations can be defined here
      this.belongsTo(models.University, {foreignKey: 'university_id', sourceKey: 'id'});
      this.belongsTo(models.Campus, {foreignKey: 'campus_id', sourceKey: 'id'});
      this.belongsTo(models.Course, {foreignKey: 'course_id', sourceKey: 'id'});
      this.hasMany(models.UniversityCampusCourseBranch, {foreignKey: 'universitycampuscourse_id'});

  };
  UniversityCampusCourse.prototype.toWeb  = function (pw) {
      let json  = this.toJSON();
      return json;
  };

  return UniversityCampusCourse;
};