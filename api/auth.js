'use strict';

var admin = require('../admin')
  , tokens = require('./tokens')
  ;


exports.isAdmin = function (req, res, next) {
  tokens.decode(req, res, function () {
    if (req.token.admin) {
      next();
    } else {
      res.status(403).json({
        message: 'please authenticate'
      });
    }
  });
};

exports.setup = function (app) {

  // login an admin user, return token if successful
  app.post('/api/login', function (req, res) {
    var user = req.body.username === admin.username;
    var pass = req.body.password === admin.password;

    if (user && pass) {
      res.status(201).json(tokens.encode({
        admin: true
      }));
    } else {
      res.status(403).json({
        message: 'incorrect login'
      });
    }
  });

};
