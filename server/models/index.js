'use strict';
const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');

const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];


const pg = new Sequelize(config.database_postgres);
const db = {
  pg: pg
};
db.user = pg.import('./user_table');
db.login = pg.import('./login_table');

db.complain = pg.import('./complain_table');

db.friend_table = pg.import('./friend_table');

db.wish = pg.import('./love_wish');

exports.db = db;
exports.pg = pg;