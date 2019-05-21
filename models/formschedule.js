'use strict';
module.exports = (sequelize, DataTypes) => {
  const FormSchedule = sequelize.define('FormSchedule', {
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    booked_for: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    booked_date: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    book_timeslot: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
  }, {});
  FormSchedule.associate = function (models) {
    // associations can be defined here
    this.belongsTo(models.User, { foreignKey: 'user_id', sourceKey: 'id' ,onDelete: 'cascade'});
    
  };

  FormSchedule.prototype.toWeb = function () {
    let json = this.toJSON();
    return json;
  }
  return FormSchedule;
};