'use strict';

// quick and dirty validation middleware
exports.validateBody = function (required) {
  return function (req, res, next) {
    var errors = [];
    for (var i = 0; i < required.length; i++) {
      var key = required[i];
      if (req.body[key] === undefined) {
        errors.push({
          message: 'the field \'' + key + '\' is required in body of request'
        });
      }
    }
    if (errors.length > 0) {
      res.status(400).json(errors);
    } else {
      next();
    }
  };
};
