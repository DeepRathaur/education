'use strict';
module.exports = (sequelize, DataTypes) => {
  var UserPreferedStates = sequelize.define('UserPreferedStates', {
    text: DataTypes.STRING
  }, {});
  UserPreferedStates.associate = function(models) {
    // associations can be defined here
      this.belongsTo(models.State,  {foreignKey: 'state_id',   sourceKey: 'id'});
      this.belongsTo(models.User,  {foreignKey: 'user_id',   sourceKey: 'id'});
  };
  return UserPreferedStates;
};