'use strict';

define([

  'jquery',
  'underscore',
  'backbone',
  'text!templates/confirm.html'

], function ($, _, Backbone, confirm) {

  return function (message, select) {
    
    var Prompt = Backbone.View.extend({

      events: { 'click button': 'select' },

      template: _.template(confirm),

      initialize: function () {
        this.$el.html(this.template({ message: message }));
      },

      select: function (e) {
        var choice = Boolean($(e.currentTarget).data('choice'));
        if (typeof select === 'function') {
          select(choice);
        }
        this.$el.remove();
      }

    });

    var p = new Prompt();

    p.$el.appendTo('body');

  };
});
