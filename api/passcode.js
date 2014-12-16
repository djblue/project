'use strict';

var crypto = require('crypto')
  , auth = require('./auth')
  , mongoose  = require('mongoose')
  , expires = 60 * 60 // 1 hr in seconds
  ;

// Setup the Token model.
// - tokens expire an hour after generation (if you modify 
//   the expire timeout, make sure to drop the tokens collection 
//   manually)
// - only one token exists at a time
// - token.code is a randomly generated 8 digit hex number
var Passcode = mongoose.model('Passcode', {
  generated: {
    type: Date,
    expires: expires, // one hour
    default: Date.now
  },
  code: {
    type: String,
    default: function () {
      return crypto.randomBytes(4).toString('hex');
    }
  }
});

// NOTE: to check the expire timeout for token.generated, try:
// > db.tokens.getIndexSpecs('generated')
// in the mongo shell.

// validate token code when adding new clients
exports.valid = function (code, done) {
  Passcode.findOne(function (err, token) {
    if (err) {
      done(false);
    } else {
      done(token !== null && token.code === code);
    }
  });
};

exports.setup = function (app) {

  // get the current passcode, generate if it doesn't exist
  app.get('/api/passcode', auth.isAdmin, function (req, res) {

    var sendPasscode = function (token) {
      res.json({
        code: token.code,
        generated: token.generated,
        expires: new Date(token.generated.getTime() + (expires * 1000))
      });
    };

    Passcode.findOne(function (err, token) {
      if (err) {
        res.status(500).json(err);
      } else if (token !== null)  {
        sendPasscode(token);
      } else {
        var t = new Passcode();
        t.save(function (err) {
          if (err) {
            res.status(500).json(err);
          } else {
            sendPasscode(t);
          }
        });
      }
    });

  });

};
