'use strict';
module.exports = (sequelize, DataTypes) => {
  const SchoolDiscounts = sequelize.define('SchoolDiscounts', {
    school_id: {
      type: DataTypes.INTEGER
    },
    discount: {
      type: DataTypes.DOUBLE,
      allowNull: false
    },
    coupon_code: {
      type: DataTypes.STRING(200),
      allowNull: false,
      unique: true
    },
    is_redeem: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: 0
    },
    expiry_date: {
      type: DataTypes.DATE,
      allowNull: false
    },
  }, {});
  SchoolDiscounts.associate = function (models) {
    // associations can be defined here
    this.belongsTo(models.Schools,  {foreignKey: 'school_id',   sourceKey: 'id'});
  };
  SchoolDiscounts.prototype.toWeb = function (pw) {
    let json = this.toJSON();
    return json;
  }

  return SchoolDiscounts;
};