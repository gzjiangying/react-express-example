"use strict";
const co = require('co');
let async = require('async');
const jrh = require('../helpers/json_res_helper');
const crypto = require('crypto');
const db = require('../models').db;
/**
body:{
  type:"",
  title:"",
  data:{
    detail:"",
    picture:[],
    video:[],
  }
}
*/
let create = function(req, res) {
  co(function*() {
    if (!req.user.id) {
      jrh.jsend_fail(res, 401, {
        base: 'please login!'
      });
      return;
    }
    let complain = null;
    try {
      complain = yield db.complain.create({
        longin_id: req.user.id,
        type: req.body.type,
        title: req.body.title,
        data: req.body.data
      });
    } catch (err) {
      console.log(err);
      jrh.jsend_error(res, 400, {
        status: 'error',
        message: 'bad request'
      });
      return;
    }
    if (!complain) {
      jrh.jsend_error(res, 400, {
        status: 'error',
        message: 'bad request'
      });
      return;
    }
    jrh.jsend_success(res, {
      id: complain.id,
      state: complain.state
    });
  }).catch((err) => {
    jrh.jsend_error(res, 500, {
      reason: 'internal_error'
    });
    console.log('error:', err);
  });
}

let destroy = function(req, res) {
    co(function*() {

    }).catch((err) => {
      jrh.jsend_error(res, 500, {
        reason: 'internal_error'
      });
      console.log('error:', err);
    });
  }
  /**
   get ?type = "all" ,page=1,size=10;
   return [{
      title:
      type:
      login_name:
      status:
      grade:
      recommend:
   }]
  */

let index = function(req, res) {
    co(function*() {
      console.log(req.query.type);
      let offset = 0;
      if (req.query.page) {
        offset = (parseInt(req.query.page) - 1) * 5;
      }

      let complains = yield db.complain.findAndCount({
        where: {
          type: req.query.type
        },
        limit: 5,
        offset: offset,
        order: [
          ['updated_at', 'DESC']
        ]
      });
      if (!complains) {
        jrh.jsend_error(res, 400, {
          status: 'error',
          message: 'bad request'
        });
        return;
      }

      let data = [];
      for (let complain of complains.rows) {
        let user = yield db.login.findById(complain.longin_id);
        let detail = null;
        if (complain.data.detail.length && complain.data.detail.length > 50) {
          detail = complain.data.detail.substr(0, 50);
        } else {
          detail = complain.data.detail;
        }
        data.push({
          id: complain.id,
          title: complain.title,
          detail: detail,
          type: complain.type,
          login_name: user.login_name,
          time: complain.created_at,
          status: complain.status,
          grade: complain.grade,
          recommend: complain.recommend
        })
      }
      jrh.jsend_success(res, {
        count: complains.count,
        rows: data
      });
    }).catch((err) => {
      jrh.jsend_error(res, 500, {
        reason: 'internal_error'
      });
      console.log('error:', err);
    });
  }
  /**
  return {
      title:
      type:
      login_name:
      data:
      status:
      comment:
      grade:
      recommend:
   }
  */
let show = function(req, res) {
    co(function*() {
      let complain = yield db.complain.findById(req.params.id);
      if (!complain) {
        jrh.jsend_error(res, 400, {
          status: 'error',
          message: 'bad request'
        });
        return;
      }
      jrh.jsend_success(res, {
        id: complain.id,
        title: complain.title,
        type: complain.type,
        login_name: complain.longin_id,
        data: complain.data,
        status: complain.status,
        comment: complain.comment,
        grade: complain.grade,
        recommend: complain.recommend
      });
    }).catch((err) => {
      jrh.jsend_error(res, 500, {
        reason: 'internal_error'
      });
      console.log('error:', err);
    });
  }
  /**
  patch 
  body{
    type:"comment"/"update"
    comment:{
      reply_id:"",
      comment:"",
      recommend:true,
      grade:1
    },
    update:{
      type:"",
      title:"",
      data:""
    }
  }
  */
let update = function(req, res) {
  co(function*() {
    let complain = yield db.complain.findById(req.params.id);
    if (!complain) {
      jrh.jsend_error(res, 400, {
        status: 'error',
        message: 'bad request'
      });
      return;
    }
    if (req.body.type === 'recommend') {
      complain.recommend = complain.recommend + 1;
      yield complain.save();
      jrh.jsend_success(res, {
        id: complain.id,
        title: complain.title,
        type: complain.type,
        login_name: complain.longin_id,
        status: complain.status,
      });
    }
    if (req.body.type === 'comment') {
      let comment = {
        id: req.params.id,
        name: req.user.login_name
      };
      for (let key in req.body.comment) {
        comment[key] = req.body.comment[key];
      }
      complain.comment.push(comment);
      yield complain.update({
        comment: complain.comment
      });
      jrh.jsend_success(res, {
        id: complain.id,
        title: complain.title,
        type: complain.type,
        login_name: complain.longin_id,
        status: complain.status,
      });
    }
    if (req.body.type === 'update') {
      if (req.user.id !== complain.longin_id) {
        jrh.jsend_error(res, 400, {
          status: 'error',
          message: 'bad request'
        });
        return;
      }
      for (let key in req.body.update) {
        complain[key] = req.body.update[key];
      }
      yield complain.save();
      jrh.jsend_success(res, {
        id: complain.id,
        title: complain.title,
        type: complain.type,
        login_name: complain.longin_id,
        status: complain.status,
      });
    }
  }).catch((err) => {
    jrh.jsend_error(res, 500, {
      reason: 'internal_error'
    });
    console.log('error:', err);
  });
}

exports.create = create;
exports.index = index;
exports.show = show;
exports.destroy = destroy;
exports.update = update;