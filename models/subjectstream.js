'use strict';
module.exports = (sequelize, DataTypes) => {
  const SubjectStream = sequelize.define('SubjectStream', {
    text:{type:DataTypes.STRING,
    allowNull:true} 
  }, {});
  SubjectStream.associate = function(models) {
    // associations can be defined here
    this.belongsTo(models.Subject, { sourceKey: 'id'});
    this.belongsTo(models.Stream, {sourceKey: 'id'});
  };
  SubjectStream.prototype.toWeb = function (pw) {
    let json = this.toJSON();
    return json;
};
  return SubjectStream;
};