'use strict';
module.exports = (sequelize, DataTypes) => {
  const TermConditions = sequelize.define('TermConditions', {
    title: {
      type: DataTypes.STRING(200),
      allowNull:true
    },
    description: {
      type: DataTypes.TEXT,
      allowNull:false
    },
    extra: {
      type: DataTypes.TEXT,
      allowNull:true
    },
  }, {});
  TermConditions.associate = function(models) {
    // associations can be defined here
  };
  TermConditions.prototype.toWeb = function (pw) {
    let json = this.toJSON();
    return json;
};
  return TermConditions;
};