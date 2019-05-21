'use strict';
module.exports = (sequelize, DataTypes) => {
  var UnvImportantLink = sequelize.define('UnvImportantLink', {
      university_id: {
          type: DataTypes.INTEGER,
          allowNull: false
      },
      campus_id: {
          type: DataTypes.INTEGER,
      },
      title: {
          type: DataTypes.STRING(200),
          allowNull: true
      },
      linkurl: {
          type: DataTypes.STRING(200),
          allowNull: true
      },
      description: {
          type: DataTypes.TEXT,
          allowNull: true
      },
      status: {
          type: DataTypes.BOOLEAN,
          defaultValue: 1,
          allowNull: false
      },
  }, {});
  UnvImportantLink.associate = function(models) {
    // associations can be defined here
      this.belongsTo(models.University, {foreignKey: 'university_id', sourceKey: 'id'});
      this.belongsTo(models.Campus, {foreignKey: 'campus_id', sourceKey: 'id'});
  };
    UnvImportantLink.prototype.toWeb = function (pw) {
        let json    =   this.toJSON();
        return json;
    };

  return UnvImportantLink;
};