'use strict';
module.exports = function(sequelize, DataTypes) {
  const complain_table = sequelize.define('complain_table', {
    longin_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false
        /**
         "food",
         "educational",
         "belief",
         "life",
         "violence",
         "delinquency",
         "drug",
         "internet",
         "factory",
         "history",
         "technology",
         "news"
         "unclassified"
         */
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    data: {
      type: DataTypes.JSONB,
      allowNull: false
        /*
        {
          detail:'',
          picture:[],
          video:[],
        }
        */
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "ok"
        // audit,ok,delete,fail
    },
    comment: {
      type: DataTypes.JSONB,
      allowNull: false,
      defaultValue: []
    },
    /**
    [
      {
        id:"",
        reply_id:"",
        name:"",
        comment:"",
        recommend:true,
        grade:1,
        time:""
      }
    ]
    */
    grade: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1
    },
    recommend: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    }
  }, {
    tableName: 'complain_table',
    underscored: true
  });
  return complain_table;
};