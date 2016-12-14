'use strict';
const _ = require('lodash');
const co = require('co');
const crypto = require('crypto');
const util = require('util');

const models = require('.');
const db = models.db;

let force = false;
process.argv.forEach((val) => {
  if (val === '--force') {
    force = true;
  }
});

co(function*() {
  yield db.pg.sync({
    force: force
  });
  let user_free = yield db.user.create({
    tel: "18585224312",
    name: "free"
  });
  let password_salt = crypto.randomBytes(16).toString('base64');
  let hashed_password = crypto.createHash('sha256')
    .update('123456')
    .update(password_salt)
    .digest('base64');
  yield db.login.create({
    user_id: user_free.id,
    e_mail: "18585224312@163.com",
    login_name: "free",
    password_salt: password_salt,
    hashed_password: hashed_password
  });
  console.log("over");
}).catch((err) => {
  console.log('error:', err);
});