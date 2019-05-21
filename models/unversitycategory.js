'use strict';
module.exports = (sequelize, DataTypes) => {
  const UnversityCategory = sequelize.define('UnversityCategory', {
    name: {
      type: DataTypes.STRING(200),
      allowNull : false
    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull:false,
      defaultValue:1
    },
  }, {});
  UnversityCategory.associate = function(models) {
    // associations can be defined here
    this.hasMany(models.University, {foreignKey: 'unvcategory_id', sourceKey: 'id'});
    
  };

  UnversityCategory.prototype.toWeb  = function (pw) {
    let json = this.toJSON();
    return json;
}


  return UnversityCategory;
};