'use strict';
module.exports = (sequelize, DataTypes) => {
    const ititrade = sequelize.define('ititrade', {
        name: {
            type: DataTypes.STRING(200),
            allowNull: false
        },
        status: {
            type: DataTypes.BOOLEAN,
            defaultValue: 1,
            allowNull: false
        },
    }, {});
    ititrade.associate = function (models) {
        // associations can be defined here
        this.hasMany(models.iticollegetrade,  {foreignKey: 'trade_id',   targetKey: 'id'});
    };
    ititrade.prototype.toWeb = function (pw) {
        let json = this.toJSON();
        return json;
    };
    return ititrade;
};