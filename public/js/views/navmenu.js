'use strict';

// A basic widget for managing student requests.  Users will be able to
// navigate different subjects and request aid for specific classes.

define(['jquery' , 'underscore', 'backbone', 'hammer', 

  'js/collections',
  'text!templates/subjects.html',
  'text!templates/courses.html',
  'text!templates/help.html'

],

function ($, _, Backbone, hammer, collections, subjects, courses, helptext) {

  return Backbone.View.extend({

    id: 'menus',

    // construor
    initialize: function () {

      // initialize hammer jquery plugin
      this.$el.hammer();

      // grab arguments and save to class
      this.subjects = collections.subjects;
      this.courses = collections.courses;

      // setup templates
      this.template = {};
      this.template.subjects = _.template(subjects);
      this.template.courses  = _.template(courses);


      // render the subjects menu
      this.rendersubjects();

      // help menu state
      this.helpstate = false;
    },

    events: {
      'tap .back':    'rendersubjects',
      'tap .subject': 'rendercourses',
      'tap .ask':     'ask',
      'tap #help':    'help'
    },

    // render the subjects
    rendersubjects: function () {
      this.$el.html(this.template.subjects({ 
        subjects: this.subjects.models
      }));
    },

    // render the courses
    rendercourses: function (e) {
      // grab the subject id to render the appropriate courses
      var id = $(e.currentTarget).data('id');
      this.$el.html(this.template.courses({
        courses: this.courses.getBySubject(id)
      }));
    },

    // ask a question
    ask: function (e) {
      // callback if provided 
      var id = $(e.currentTarget).data('id');
      collections.questions.ask(id);
      // render the subjects menu
      this.rendersubjects();
    },

    help: function (e) {
      if (!this.helpstate) {
        $(e.currentTarget).append(helptext);
        this.helpstate = true;
      } else {
        $(e.currentTarget).html('?');
        this.helpstate = false;
      }
    }

  });

});
