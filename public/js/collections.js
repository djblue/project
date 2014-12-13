define(['backbone'], function (Backbone) {

  'use strict';

  var Subject = Backbone.Model.extend({
      idAttribute: '_id',
      initialize: function () {}
  });


  var Subjects = Backbone.Collection.extend({
    initialize: function () {
      // Ensure data is avaliable before leaving module.
      this.fetch({ async: false });
    },
    url: '/api/subjects',
    model: Subject
  });

  var subjects = new Subjects();



  var Course = Backbone.Model.extend({

    idAttribute: '_id',

    initialize: function () {

      var subject = subjects.get(this.get('subject'));
      this.set('label',
        subject.get('prefix') + ' ' + this.get('number')
      );
    }

  });  

  var Courses = Backbone.Collection.extend({
    initialize: function () {
      // Ensure data is avaliable before leaving module.
      this.fetch({ async: false });
    },
    url: '/api/courses',
    model: Course,
    getBySubject: function (subject) {
      return this.where({ subject: String(subject) });
    }
  });

  var courses = new Courses();



  var Question = Backbone.Model.extend({

    idAttribute: '_id',

    initialize: function () {
      var course = courses.get(this.get('course'));
      this.set('subject', course.get('subject'));
      this.set('title', course.get('title'));
      this.set('label', course.get('label'));
      this.set('color', course.get('color'));
    },

    isEqual: function (question) {
      if (question === undefined) {
        return false;
      } else {
        return question.get('title') === this.get('title');
      }
    }

  }); 

  var Questions =  Backbone.Collection.extend({
    initialize: function () {
      // go grab some data!
      var that = this;
      this.fetch({
        success: function () {
          that.trigger('change');
        }
      });
      // the recent questions that have been asked
      this.recent = [];
      // the maximum number of questions
      this.max = 3;
    },

    model: Question,

    url: '/api/questions', // Get questions from the current session.

    // ask a new question give a course id
    ask: function (course) {
      // if # of questions == max, trigger max event.
      if (this.models.length >= this.max) {
        this.trigger('max');
      } else {
        // try to find a question which the same course, 
        // will return an array of results
        var find = this.where({ course: course });

        // if a questions already exists, it will 
        // trigger a exists event.
        if (find.length > 0) {
          this.trigger('exists', find[0]);

        // finally, create the darn thing
        } else {
          this.create({ course: course });
        }
      }
    },

    // cancel an already asked question by its id
    cancel: function (id) {
      this.get(id).destroy();
    },

    // allow a user to complete a question
    complete: function (id) {
      var q = this.get(id);
      if (q !== undefined) {
        q.save({'completed': true});

        // update recent list
        if (!q.isEqual(this.recent[0])) {
          this.recent[1] = this.recent[0];
          this.recent[0] = q;
        }

        this.remove(id);
      }
    },


  });

  return {
    subjects: subjects,
    courses: courses,
    questions: new Questions()
  };

});
