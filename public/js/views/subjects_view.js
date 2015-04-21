'use strict';

define([
  'jquery',
  'underscore',
  'backbone',
  'js/subjects'
], 

function ($, _, Backbone, subjects) {

  return Backbone.View.extend({

    initialize: function () {
      subjects.on('change', render, this);
    },

    collection: subjects,

    template: _.template($('#main_menu').html()),

    render: function () {

      this.$el.html(this.template({ 

        subjects: this.collection.models 

      }));
    }

  });

});
