'use strict';
module.exports = (sequelize, DataTypes) => {
  const CourseCategory = sequelize.define('CourseCategory', {
    name: {
      type: DataTypes.STRING(200),
      allowNull: false,
      unique: true
    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: 1,
    },
  }, {});
  CourseCategory.associate = function (models) {
    // associations can be defined here
    this.hasMany(models.Course, {foreignKey: 'course_category_id', sourceKey: 'id'});
  };

  CourseCategory.prototype.toWeb  = function (pw) {
    let json = this.toJSON();
    return json;
}
  return CourseCategory;
};