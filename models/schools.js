'use strict';
module.exports = (sequelize, DataTypes) => {
  const Schools = sequelize.define('Schools', {
    name: {
      type: DataTypes.STRING(255),
      allowNull:false
    },
    contactpersonname: {
      type: DataTypes.STRING(200),
      allowNull:true
    },
    designation: {
      type: DataTypes.STRING(200),
      allowNull:true
    },
    email: {
      type: DataTypes.STRING(200),
      allowNull:true
    },
    mobileno: {
      type: DataTypes.STRING(255),
      allowNull:true
    },
    phoneno: {
      type: DataTypes.STRING(255),
      allowNull:true
    },
    state_id: {
      type: DataTypes.INTEGER,
      allowNull:true
    },
    city_id: {
      type: DataTypes.INTEGER,
      allowNull:true
    },
    address: {
      type: DataTypes.TEXT,
      allowNull:true
    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull:false,
      defaultValue: 1,
    },
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
  }, {});
  Schools.associate = function(models) {
    // associations can be defined here
    this.belongsTo(models.State, {foreignKey: 'state_id', sourceKey: 'id'});
    this.belongsTo(models.City , {foreignKey: 'city_id', sourceKey: 'id'});
    this.hasMany(models.SchoolDiscounts, {foreignKey: 'school_id', sourceKey: 'id'});
  };
  Schools.prototype.toWeb  = function (pw) {
    let json    =   this.toJSON();
    return json;
}

  return Schools;
};