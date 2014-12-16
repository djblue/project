'use strict';

// the question queue api

var scheduler = require('./scheduler')
  , tokens    = require('./tokens')
  , mongoose  = require('mongoose')
  ;

// Setup the use model.
var Question = exports.Question = mongoose.model('Question', {
  // what course and subject was the question about
  course: String,
  subject: String,

  title: String,
  label: String,


  table: Number,
  // for what location was the question asked
  location: String,

  // begin-end timestamp for question
  begin: { type: Date, default: Date.now },
  end: Date,

  // was the question completed or canceled
  completed: Boolean,
});

// return questions to user based on their session table
var getByTable = function (req, res) {

  // get questions that have not been completed
  Question.find({
    table: req.token.table,
    end: { $exists: false }
  }).exec(function (err, questions) {
    if (err) {
      res.status(500).json(err);
    } else {
      res.json(questions);
    }
  });
};

// add a question to the end of the queue
var add = function (req, res, next) {
  if (req.token.table !== undefined) {

    var q = req.body;

    q.table = req.token.table;
    q.location = req.token.location;

    var question = new Question(q);
    question.save(function (err, model) {
      if (err) {
        res.status(500).json(err);
      } else {
        res.status(201).json({ _id: model._id });
        next();
      }
    });

  } else {
    res.status(403).json({
      message: 'please authenticate'
    });
  }
};

// confirm that a question has been completed
var confirm = function (req, res, next) {
  var q = {};
  q.end = Date.now(); // update end tag
  q.completed = true;
  q.$unset = { user: '', title: '', label: '', table: '' };
  Question.findByIdAndUpdate(req.params.id, q)
    .exec(function (err, model) {
      if (err) {
        res.status(500).json(err);
      } else {
        res.json(model);
        next();
      }
    });
};

// delete question from queue
var del = function (req, res, next) {
  var q = {};
  q.end = Date.now(); // update end tag
  q.completed = false;
  q.$unset = { user: '', title: '', label: '', table: '' };
  Question.findByIdAndUpdate(req.params.id, q)
    .exec(function (err, model) {
      if (err) {
        res.status(500).json(err);
      } else {
        res.json(model);
        next();
      }
    });
};

exports.setup = function (app, io) {

  app.get('/', function (req, res) {
    res.render('dynamic', {
      title: 'Request',
      style: 'request',
      production: 'production' === app.get('env'),
      main: 'request'
    });
  });

  // update connected sockets
  var sockets = function (req) {
    var location = req.token.location;
    var ns = io.of('/' + location);
    Question.find({
      location: location,
      end: { $exists: false }
    }, function (err, questions) {
      ns.emit('questions', questions);
    });
  };

  app.get('/api/questions', tokens.decode, getByTable);

  app.post('/api/questions', tokens.decode, add, sockets);
  app.put('/api/questions/:id', tokens.decode, confirm, sockets);
  app.delete('/api/questions/:id', tokens.decode, del, sockets);

  scheduler.getLocations(function (err, locations) {
    if (err) {
      console.log(err);
    } else {
      locations.forEach(function (location) {
        // create a room for each location (for the queue)
        var ns = io.of('/' + location._id);
        ns.on('connection', function () {
          Question.find({
            location: location,
            end: { $exists: false }
          }, function (err, questions) {
            ns.emit('questions', questions);
          });
        });
      });
    }

  });

};
