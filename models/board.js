'use strict';
module.exports = (sequelize, DataTypes) => {
    var Board = sequelize.define('Board', {

        name: {
            type: DataTypes.STRING(200),
            allowNull: false,
            unique: true
        },
        status: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: 1
        },
    }, {});
    Board.associate = function (models) {
        // associations can be defined here
        this.hasMany(models.User, {foreignKey: 'board_id', sourceKey: 'id'});
    };

    Board.prototype.toWeb   =   function (pw) {
        let json    =   this.toJSON();
        return json;
    }
    return Board;
};