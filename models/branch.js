'use strict';
module.exports = (sequelize, DataTypes) => {
  var Branch = sequelize.define('Branch', {
      name: {
          type: DataTypes.STRING(200),
          allowNull: false,
          unique: true
      },
      status: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: 1
      },
  }, {});
  Branch.associate = function(models) {
    // associations can be defined here
      this.Course = this.belongsToMany(models.Course, {through: 'CourseBranch'});
      this.hasMany(models.UniversityCampusCourseBranch, {foreignKey: 'branch_id', sourceKey: 'id'});
  };

  Branch.prototype.toWeb  =   function (pw) {
      let json  =   this.toJSON();
      return json;
  }

  return Branch;
};