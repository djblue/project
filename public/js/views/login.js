'use strict';

define([ 'jquery', 'underscore', 'backbone',

  'js/collections',
  'text!templates/login.html'

], 

function ($, _, Backbone, collections, login) {

  var session = null;
  
  return Backbone.View.extend({

    id: 'login',
    
    events: {
      'click .register': 'register'
    },

    initialize: function () {
      var self = this;
      $.get('/api/session')
        .fail(function (res) {
          var error = res.responseJSON.message;
          $.get('/api/locations', function (locations) {
            self.$el.html(_.template(login, {
              message: error,
              locations: locations,
              available: [1,2,3,4,5]
            }));
          });
        });
    },

    register: function () {
      var self = this;
      var $message = $(this.$el.find('#message'));
      var info = {
        table: this.$el.find('#table').val(),
        location: this.$el.find('#location').val(),
        password: this.$el.find('#password').val(),
      };
      $.post('/api/session', info)
        .then(function (s) {
          session = s;
          self.$el.remove();
        })
        .fail(function (res) {
          var error = res.responseJSON.message;
          $message.html(error);
        });
    }

  });

});
