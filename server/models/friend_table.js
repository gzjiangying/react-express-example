'use strict';

module.exports = function (sequelize, DataTypes) {
  const friend_table = sequelize.define('friend_table', {
    longin_id:{
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    friend_id:{
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  },
  {
    tableName: 'friend_table',
    underscored: true
  });
  return friend_table;
};
