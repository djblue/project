'use strict';

define([
  'underscore',
  'backbone', 
  'js/collections'
], 

function (_, Backbone, collections) {

  var courses = collections.courses;
  var subjects = collections.subjects;

  var BaseStatistic = Backbone.Model.extend({
    idAttribute: '_id',

    initialize: function () {
      var self = this;
      this.subjects = _.map(subjects.models, function (subject) {
        return _.reduce(_.pairs(self.get('questions')), function (memo, question) {
          if (courses.get(question[0]).get('subject').id === subject.id) {
            return memo + question[1];
          } else { return memo; }
        }, 0);
      });
    },
  });  

  var Stat = {
    weekly: BaseStatistic.extend({
      initialize: function () {
        this.attributes.formatted = 'Week ' + this.attributes.label;
      }
    }),
    daily: BaseStatistic.extend({
      initialize: function () {
        var days = [
          'Sunday',
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday'
        ];
        this.attributes.formatted =  days[this.attributes.label];
      }
    }),
    hourly: BaseStatistic.extend({
      initialize: function () {
        if (Number(this.attributes.label) > 12) {
          this.attributes.formatted = (Number(this.attributes.label) - 12 ) + ' P.M.';
        } else {
          this.attributes.formatted = this.attributes.label + ' A.M.';
        }
      }
    })
  };

  var BaseStatistics = Backbone.Collection.extend({

    initialize: function () {
    },

    // total number of questions for each subject
    getTotals: function () {
      var temp = [];
     _.each(this.models, function (stat) {
        temp[temp.length] = stat.get('subjects');
     });

     return temp;
    },

    // totals number of questions
    getTotal: function () {
      return _.reduce(this.models, function (memo, stat) {
        return memo + stat.get('total');
      }, 0);
    },

    // average number of seconds per question
    getAvgTime: function () {
      var time = _.reduce(this.models, function (memo, stat) {
        return memo + stat.get('time');
      }, 0);

      return (time/this.getTotal()).toFixed(2);
    },


    // get the n most popular subjects 
    // where n is optional
    top: function () {
      var list = _.reduce(this.models, function (memo, obj) {
        _.each(_.keys(obj.get('questions')), function (i) {
          if (!!memo[i]) {
            memo[i] += obj.get('questions')[i];
          } else {
            memo[i] = obj.get('questions')[i];
          }
        });
        return memo;
      }, {});
      
      list = _.map(list, function (value, key) {
        var course = courses.findWhere({'_id': key});
        return {
          'course': key,
          'title': course.get('title'),
          'label': course.get('label'),
          'count': value
        };
      });

      list = _.sortBy(list, 'count').reverse();

      return _.first(list, 5);
    },

    // generate totals as tsv
    tsv: function () {
      return _.reduce(this.getTotals(), function (memo, obj) {
        return memo + obj.join('\t') + '\n';
      }, '');
    },

    // download data as tsv
    download: function () {
      return 'data:Application/octet-stream,' +
        encodeURIComponent(this.tsv());
    },

    url: '/api/statistics'
  });

  return {
    weekly: BaseStatistics.extend({
      model: Stat.weekly
    }),
    daily: BaseStatistics.extend({
      model: Stat.daily
    }),
    hourly: BaseStatistics.extend({
      model: Stat.hourly
    }),
  };

});
