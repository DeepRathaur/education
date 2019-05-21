'use strict';
module.exports = (sequelize, DataTypes) => {
  var Stream = sequelize.define('Stream', {
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
  Stream.associate = function(models) {
    // associations can be defined here
      this.hasMany(models.User, {foreignKey: 'stream_id', sourceKey: 'id'});
      this.hasMany(models.SubjectStream,{foreignKey:'StreamId'});
      this.Alert = this.belongsToMany(models.Alert, {through: 'AlertStream'});
      
  };

  Stream.prototype.toWeb  = function (pw) {
      let json    =   this.toJSON();
      return json;
  }
  return Stream;
};