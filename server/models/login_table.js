'use strict';

module.exports = function(sequelize, DataTypes) {
  const login_table = sequelize.define('login_table', {
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: null,
    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    role: { //user,op,amdin
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'user',
    },
    login_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password_salt: {
      type: DataTypes.STRING,
      allowNull: false
    },
    hashed_password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    e_mail: {
      type: DataTypes.STRING,
      allowNull: false
    },
    head_portrait: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    tableName: 'login_table',
    underscored: true
  });
  return login_table;
};