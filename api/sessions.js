'use strict';

// the question queue api

var tableIds = [];

for (var i = 0; i < 20; i++) {
  tableIds.push(i+1);
}

// basic authentication middleware
var auth = exports.auth = function (req, res, next) {
  // if you have been authenticate, you have 
  // been assigned a table
  if (req.session.table !== undefined) {
    next();
  } else {
    res.status(403).json({
      message: 'please authenticate'
    });
  }
};

var getSessionInfo = function (req, res) {
  res.json({
    table: req.session.table,
    location: req.session.location
  });
};

var createNewSession = function (req, res) {
  var i = Number(req.body.table);

  // check password
  if (req.body.password !== 'password') {
    res.status(400).json({
      message: 'incorrect password'
    });
  // what table?
  } else if (req.body.table === undefined) {
    res.status(400).json({
      message: 'missing table'
    });
  } else if (isNaN(i)) {
    res.status(400).json({
      message: 'table must be a number'
    });
  } else if (req.body.location === undefined) {
    res.status(400).json({
      message: 'missing location'
    });
  // table has been successfully register
  } else {
    req.session.table = i;
    req.session.location = req.body.location;
    res.status(201).json({
      table: req.session.table,
      location: req.session.location
    });
  }
};

exports.setup = function (app) {
  app.get('/api/session', auth, getSessionInfo);
  app.post('/api/session', createNewSession);
};
