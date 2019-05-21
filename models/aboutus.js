'use strict';
module.exports = (sequelize, DataTypes) => {
  const AboutUS = sequelize.define('AboutUS', {
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
  AboutUS.associate = function(models) {
    // associations can be defined here
  };
  AboutUS.prototype.toWeb = function (pw) {
    let json = this.toJSON();
    return json;
};
  return AboutUS;
};