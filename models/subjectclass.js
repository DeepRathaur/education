'use strict';
module.exports = (sequelize, DataTypes) => {
  const SubjectClass = sequelize.define('SubjectClass', {
    text:{
      type:DataTypes.STRING,
      allowNull:true
    } 
  }, {});
  SubjectClass.associate = function(models) {
    // associations can be defined here
    this.belongsTo(models.Subject, { sourceKey: 'id'});
    this.belongsTo(models.Class, { sourceKey: 'id'});
  };
  SubjectClass.prototype.toWeb = function (pw) {
    let json = this.toJSON();
    return json;
};
  return SubjectClass;
};