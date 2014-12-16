'use strict';

var jwt = require('jwt-simple')
  , secret = 'secret'
  ;

// middle ware to decode jwt tokens
exports.decode = function (req, res, next) {
  if (req.headers.authorization === undefined) {
    res.status(400).json({
      message: 'please include \'Authroization\' token in headers'
    });
  } else {
    try {
      var token = req.headers.authorization.split(' ').pop();
      req.token = jwt.decode(token, secret);
      next();
    } catch (e) {
      res.status(400).json({
        message: 'bad token'
      });
    }
  }
};

exports.encode = function (obj) { return jwt.encode(obj, secret); };
