"use strict";
const co = require('co');
let async = require('async');
const jrh = require('../helpers/json_res_helper');
const crypto = require('crypto');
const db = require('../models').db;

let create = function(req, res) {
  co(function*() {
    let ip = req.ip.split(':')[3];
    console.log(ip);
    let wish = yield db.wish.create({
      ip: ip,
      name: req.body.name,
      wish: req.body.wish
    });
    if (!wish) {
      console.log("db error");
      jrh.jsend_fail(res, 400, "db error");
    }
    jrh.jsend_success(res, {
      id: wish.id,
      ip: wish.ip,
      name: wish.name,
      wish: wish.wish
    });
  }).catch((err) => {
    jrh.jsend_error(res, 500, {
      reason: 'internal_error'
    });
    console.log('error:', err);
  });
}

let index = function(req, res) {
  co(function*() {
    let offset = 0;
    if (req.query.page) {
      offset = (parseInt(req.query.page) - 1) * 5;
    }
    let wish = yield db.wish.findAndCount({
      limit: 10,
      offset: offset,
      order: [
        ['updated_at', 'DESC']
      ]
    });
    let data = [];
    for (let tem of wish.rows) {
      data.push({
        name: tem.name,
        wish: tem.wish,
        ip: tem.ip,
        time: tem.created_at
      });
    }
    jrh.jsend_success(res, {
      count: wish.count,
      data
    });
  }).catch((err) => {
    jrh.jsend_error(res, 500, {
      reason: 'internal_error'
    });
    console.log('error:', err);
  });
}
exports.create = create;
exports.index = index;