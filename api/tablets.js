'use strict';

var passcode = require('./passcode')
  , tokens = require('./tokens')
  , util = require('./util')
  ;


exports.setup = function (app) {

  // get a token for a tablet
  app.post('/api/tablets',

  util.validateBody(['code', 'table', 'location']),

  function (req, res) {
    passcode.valid(req.body.code, function (yes) {
      if (yes) {
        res.status(201).json(
          tokens.encode({
            table: req.body.table,
            location: req.body.location
          })
        );
      } else {
        res.status(403).json({
          message: 'incorrect passcode'
        });
      }
    });
  });

};
