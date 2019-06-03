'use strict';
module.exports = (sequelize, DataTypes) => {
    const iticollegetrade = sequelize.define('iticollegetrade', {
        text: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        college_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        trade_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
    }, {});
    iticollegetrade.associate = function (models) {
        // associations can be defined here
        this.belongsTo(models.iticollege,  {foreignKey: 'college_id',   targetKey: 'id'});
        this.belongsTo(models.ititrade,  {foreignKey: 'trade_id',   targetKey: 'id'});
    };
    iticollegetrade.prototype.toWeb = function (pw) {
        let json = this.toJSON();
        return json;
    };
    return iticollegetrade;
};


