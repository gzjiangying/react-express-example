module.exports = function(sequelize, DataTypes) {
  const love_wish = sequelize.define('love_wish', {
    ip: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    wish: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  }, {
    tableName: 'love_wish',
    underscored: true
  });
  return love_wish;
};