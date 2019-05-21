'use strict';
module.exports = (sequelize, DataTypes) => {
  const referrals = sequelize.define('referrals', {
    referrer_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    referred_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: 1
    },
  }, {});
  referrals.associate = function(models) {
    // associations can be defined here
    this.belongsTo(models.User, {foreignKey: 'referrer_id', sourceKey: 'id'});
    this.belongsTo(models.User, {foreignKey: 'referred_id', sourceKey: 'id'});
  };
  return referrals;
};