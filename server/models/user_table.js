'use strict';

module.exports = function(sequelize, DataTypes) {
  const user_table = sequelize.define('user_table', {
    tel: {
      type: DataTypes.STRING,
      allowNull: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true
    },
    sex: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    birthday: {
      type: DataTypes.DATE,
      allowNull: true
    },
    living_city: {
      type: DataTypes.STRING,
      allowNull: true
    },
    Family_register: {
      type: DataTypes.STRING,
      allowNull: true
    },
    ID_card: {
      type: DataTypes.STRING,
      allowNull: true
    },
    job: {
      type: DataTypes.STRING,
      allowNull: true
    },
    interest: {
      type: DataTypes.STRING,
      allowNull: true
    }, //,兴趣
    motto: {
      type: DataTypes.STRING,
      allowNull: true
    }, //座右铭
    self_introduction: {
      type: DataTypes.STRING,
      allowNull: true
    }, //自我介绍。
    register_time: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    tableName: 'user_table',
    underscored: true
  });
  return user_table;
};