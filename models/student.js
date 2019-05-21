'use strict';
module.exports = (sequelize, DataTypes) => {
  var Student = sequelize.define('Student', {
    firstname: DataTypes.STRING
  }, {});
  Student.associate = function(models) {
    // associations can be defined here
  };
  return Student;
};