"use strict";
const co = require('co');
let async = require('async');
const jrh = require('../helpers/json_res_helper');
const crypto = require('crypto');
const db = require('../models').db;

let check_cookie = function(req, res, next) {
  co(function*() {
    if (!req.signedCookies.user_info) {
      jrh.jsend_error(res, 500, {
        reason: 'cookie error'
      });
      return;
    }
    if (req.signedCookies.user_info.expires > Date.now()) {
      console.log(req.signedCookies.user_info);
      let user = yield db.login.findById(req.signedCookies.user_info.id);
      if (!user) {
        jrh.jsend_fail(res, 401, {
          base: 'no cookie'
        });
        return;
      }
      let user_info = {
        id: user.id,
        login_name: user.login_name,
        role: user.role,
        expires: Date.now() + 1000 * 60 * 60
      };
      res.cookie("user_info", user_info, {
        signed: true,
        maxAge: 1000 * 60 * 60
      });
      req.user = {
        id: user.id,
        e_mail: user.e_mail,
        login_name: user.login_name
      };

    } else {
      console.log("cookie past due");
      res.clearCookie("user_info");
      jrh.jsend_fail(res, 401, {
        "base": "cookie past due"
      });
      return;
    }
    next();
  }).catch((err) => {
    jrh.jsend_error(res, 500, {
      reason: 'internal_error'
    });
    console.log('error:', err);
  });
}

let login = function(req, res) {
  co(function*() {
    let user = null;
    console.log(req.signedCookies.user_info);
    if (req.body.type === "cookie") {
      if (!req.signedCookies.user_info) {
        jrh.jsend_error(res, 500, {
          reason: 'cookie error'
        });
        return;
      }
      if (req.signedCookies.user_info.expires > Date.now()) {
        user = yield db.login.findById(req.signedCookies.user_info.id);
        if (!user) {
          jrh.jsend_fail(res, 401, {
            base: 'name or password error'
          });
          return;
        }
      } else {
        console.log("cookie past due");
        res.clearCookie("user_info");
        jrh.jsend_fail(res, 401, {
          "base": "cookie past due"
        });
        return;
      }
    } else {
      let passwd = req.body.passwd;
      let login_name = req.body.login_name;
      user = yield db.login.findOne({
        'where': {
          login_name: login_name
        }
      });
      if (!user) {
        jrh.jsend_fail(res, 401, {
          base: 'name or password error'
        });
        return;
      }
      if (!user.status) {
        jrh.jsend_fail(res, 401, {
          base: 'status error'
        });
      }
      let hashed_password = crypto.createHash('sha256')
        .update(passwd)
        .update(user.password_salt)
        .digest('base64');
      if (hashed_password !== user.hashed_password) {
        jrh.jsend_fail(res, 401, {
          base: 'name or password error'
        });
        return;
      }
    }
    let user_info = {
      id: user.id,
      login_name: user.login_name,
      role: user.role,
      expires: Date.now() + 1000 * 60 * 60
    };
    res.cookie("user_info", user_info, {
      signed: true,
      maxAge: 1000 * 60 * 60
    });
    jrh.jsend_success(res, {
      id: user.id,
      login_name: user.login_name,
      role: user.role,
      e_mail: user.e_mail,
      head_portrait: user.head_portrait
    });
  }).catch((err) => {
    jrh.jsend_error(res, 500, {
      reason: 'internal_error'
    });
    console.log('error:', err);
  });
};

let logout = function(req, res) {
  co(function*() {

  }).catch((err) => {
    jrh.jsend_error(res, 500, {
      reason: 'internal_error'
    });
    console.log('error:', err);
  });
};

let register = function(req, res) {
  co(function*() {
    let user = null;
    try {
      let password_salt = crypto.randomBytes(16).toString('base64');
      let hashed_password = crypto.createHash('sha256')
        .update(req.body.passwd)
        .update(password_salt)
        .digest('base64');
      user = yield db.login.create({
        login_name: req.body.login_name,
        password_salt: password_salt,
        hashed_password: hashed_password,
        e_mail: req.body.e_mail
      });
    } catch (err) {
      console.log(err);
      jrh.jsend_error(res, 400, {
        status: 'error',
        message: 'bad request'
      });
      return;
}    if (!user) {
      jrh.jsend_error(res, 400, {
        status: 'error',
        message: 'bad request'
      });
      return;
    }
    jrh.jsend_success(res, {
      id: user.id,
      state: user.state,
      longin_name: user.longin_name
    });
  }).catch((err) => {
    jrh.jsend_error(res, 500, {
      reason: 'internal_error'
    });
    console.log('error:', err);
  });
};

let add_user = function(req, res) {
  co(function*() {

  }).catch((err) => {
    jrh.jsend_error(res, 500, {
      reason: 'internal_error'
    });
    console.log('error:', err);
  });
}

let update_user = function(req, res) {
  co(function*() {

  }).catch((err) => {
    jrh.jsend_error(res, 500, {
      reason: 'internal_error'
    });
    console.log('error:', err);
  });
}

let del_user = function(req, res) {
  co(function*() {

  }).catch((err) => {
    jrh.jsend_error(res, 500, {
      reason: 'internal_error'
    });
    console.log('error:', err);
  });
}

let add_friend = function(req, res) {
  co(function*() {

  }).catch((err) => {
    jrh.jsend_error(res, 500, {
      reason: 'internal_error'
    });
    console.log('error:', err);
  });
}

let del_friend = function(req, res) {
  co(function*() {

  }).catch((err) => {
    jrh.jsend_error(res, 500, {
      reason: 'internal_error'
    });
    console.log('error:', err);
  });
}

let find_friend = function(req, res) {
  co(function*() {

  }).catch((err) => {
    jrh.jsend_error(res, 500, {
      reason: 'internal_error'
    });
    console.log('error:', err);
  });
}

let audit = function(req, res) {
  co(function*() {

  }).catch((err) => {
    jrh.jsend_error(res, 500, {
      reason: 'internal_error'
    });
    console.log('error:', err);
  });
}
exports.check_cookie = check_cookie;
exports.login = login;
exports.register = register;