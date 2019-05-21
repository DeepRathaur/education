'use strict';
module.exports = (sequelize, DataTypes) => {
  const Coursefor = sequelize.define('Coursefor', {
    name: {
      type: DataTypes.STRING(200),
      allowNull:false,
      unique:true
    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull:false,
      defaultValue:1
    },
  }, {});
  Coursefor.associate = function(models) {
    // associations can be defined here
    this.hasMany(models.Course, {foreignKey: 'course_for_id', sourceKey: 'id'});
  };
  Coursefor.prototype.toWeb  = function (pw) {
    let json = this.toJSON();
    return json;
}
  return Coursefor;
};