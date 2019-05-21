'use strict';
module.exports = (sequelize, DataTypes) => {
  const City = sequelize.define('City', {
    name: DataTypes.STRING,
    state_id: DataTypes.INTEGER,
    status: DataTypes.BOOLEAN
  }, {});
  City.associate = function(models) {
    // associations can be defined here
    this.belongsTo(models.State, {foreignKey: 'state_id', sourceKey: 'id'});
    this.hasMany(models.Schools, {foreignKey: 'city_id', sourceKey: 'id'});
    this.hasMany(models.University, {foreignKey: 'city_id', sourceKey: 'id'});
    this.hasMany(models.User, {foreignKey: 'city_id', sourceKey: 'id'});
    this.hasMany(models.iticollege, {foreignKey: 'city_id', sourceKey: 'id'});
  };
  City.prototype.toWeb   =   function (pw) {
    let json    =   this.toJSON();
    return json;
};
  return City;
};