'use strict';

// enables statistical tracking using mongodb

// setup database client and server connections
var moment = require('moment')
  , Question = require('./questions').Question
  ;

// function to approximate the week of the year
Date.prototype.getWeek = function () {
    var onejan = new Date(this.getFullYear(),0,1);
    return Math.ceil((((this - onejan) / 86400000) + onejan.getDay()+1)/7);
};

// function to approximate the current semester
Date.prototype.getSemester = function () {

    var semester;

    if (this.getMonth() <=5 && this.getDate() <= 11) {
        semester = 'SP';
    } else if (this.getMonth() <=8 && this.getDate() <= 15) {
        semester = 'SU';
    } else {
        semester = 'FA';
    }   

    // append the year to approximated term
    return semester + this.getFullYear();
};

// statistics api
// need to specify for query:
//    time span group (year,month,day,hour) for grouping

// don't need to specify all

// ?year=(true|false)
// ?month=(true|false)
// ?day=(true|false)
// ?hour=(true|false)

//    [start time - end time] sensible defaults (current month) for filtering
//    location - for filtering

// ?start
// ?end

// /api/statistics/:location?

// summary document example
//
//   {
//     "questions": {},
//     "subject": "0",
//     "location": "0",
//     "total": 13,
//     "time": 14828,
//     "completed": 9
//   }
//

// archiving would also be nice, remove old data

var getStats = function (req, res) {

  var start = moment().startOf('month')._d;
  var end = moment().endOf('month')._d;

  var query =  {
    location: req.params.location,
    // default to the current month
    begin: { $gte: start, $lt: end  },
    // check only completed questions
    end: { $exists: true }
  };

  Question.mapReduce({
    map: function () {
      var d =  new Date(this.begin);
      var n = new Date(this.end);
      var group = (d.getMonth() + 1) + '-' + d.getDate() + '-' + d.getFullYear();
      var ret = {
        questions: {},
        subject: this.subject,
        location: this.location,
        total: 1,
        time: n.getTime() - d.getTime(),
      };
      if (this.completed === true) {
        ret.completed = 1;
      } else {
        ret.completed = 0;
      }
      ret.questions[this.course] = 1;
      emit(group + ':' + this.subject, ret); // jshint ignore:line
    },
    reduce: function (key, values) {
      var ret = values[0];
      ret.total = values.length;
      var courses = {};
      var completed = 0;
      var time = 0;
      values.forEach(function (value) {
        time += value.time;
        completed += value.completed;
        var key = Object.keys(value.questions)[0];
        if (courses[key] === undefined) {
          courses[key] = 1;
        } else {
          courses[key] += 1;
        }
      });
      ret.questions = courses;
      ret.time = time;
      ret.completed = completed;
      return ret;
    },
    query: query
  }, function (err, models) {
    if (err) {
      console.log(err);
      res.status(500).end();
    } else {
      res.json(models);
    }
  });
};

exports.setup = function (app) {

  app.get('/api/statistics/:location', getStats);

  app.get('/stats', function (req, res) {
    res.render('dynamic', {
      title: 'Statistics',
      style: 'stats',
      production: 'production' === app.get('env'),
      main: 'stats'
    });
  });

};
