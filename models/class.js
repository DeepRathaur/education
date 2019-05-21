'use strict';
module.exports = (sequelize, DataTypes) => {
  var Class = sequelize.define('Class', {
      name: {
          type: DataTypes.STRING(100),
          allowNull: false,
          unique: true
      },
      status: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: 1
      },
  }, {});
  Class.associate = function(models) {
    // associations can be defined here
    this.hasMany(models.SubjectClass,{foreignKey:'ClassId'}); 
      this.hasMany(models.User, {foreignKey: 'class_id', sourceKey: 'id'});
  };

    Class.prototype.toWeb  = function (pw) {
        let json = this.toJSON();
        return json;
    }

    return Class;
};