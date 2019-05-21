'use strict';
module.exports = (sequelize, DataTypes) => { 
  var Course = sequelize.define('Course', {
      name: {
          type: DataTypes.STRING(255),
          allowNull: false,
          unique: false
      },
      course_category_id: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      course_for_id: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      course_duration :{
          type: DataTypes.STRING(200),
          allowNull: true
      },
      status: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: 1
      },
  }, {});
  Course.associate = function(models) {
    // associations can be defined here
      this.hasMany(models.User, {foreignKey: 'course_id', sourceKey: 'id'});
      this.Branch = this.belongsToMany(models.Branch, {through: 'CourseBranch'});
      this.hasMany(models.UniversityCampusCourse, {foreignKey: 'course_id', sourceKey: 'id'});
      this.Alert = this.belongsToMany(models.Alert, {through: 'AlertCourse'});
      this.belongsTo(models.CourseCategory, {foreignKey: 'course_category_id', sourceKey: 'id'});
      this.belongsTo(models.Coursefor, {foreignKey: 'course_for_id', targetKey: 'id'});
      this.hasMany(models.UniversityCampusCourseBranch, {foreignKey: 'course_id', sourceKey: 'id'});

  };

  Course.prototype.toWeb  = function (pw) {
      let json = this.toJSON();
      return json;
  };

  return Course; 
};