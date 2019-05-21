'use strict';
module.exports = (sequelize, DataTypes) => {
  const Faqs = sequelize.define('Faqs', {
    question: {
      type: DataTypes.TEXT,
      allowNull:false
    },
    answer: {
      type: DataTypes.TEXT,
      allowNull:false
    },
  }, {});
  Faqs.associate = function(models) {
    // associations can be defined here
  };
  Faqs.prototype.toWeb  = function(pw) {
    let json  = this.toJSON();
    return json
  }
  return Faqs;
};