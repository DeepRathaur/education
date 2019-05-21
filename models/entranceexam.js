'use strict';
module.exports = (sequelize, DataTypes) => {
  const EntranceExam = sequelize.define('EntranceExam', {
    title: {
      type: DataTypes.STRING(255),
      allowNull:true
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull:true
    },
    about: {
      type: DataTypes.TEXT,
      allowNull:true
    },
    description: {
      type: DataTypes.TEXT,
      allowNull:true
    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull:false,
      defaultValue:1
    },
  }, {});
  EntranceExam.associate = function(models) {
    // associations can be defined here
  };
  EntranceExam.prototype.toWeb  = function (pw) {
    let json  = this.toJSON();
    return json;
}
  return EntranceExam;
};