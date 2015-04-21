'use strict';

define([ 'jquery', 'underscore', 'backbone',

  'js/collections',
  'text!templates/login.html'

], 

function ($, _, Backbone, collections, login) {

  return function (done) {

    var Login = Backbone.View.extend({

      id: 'login',
      
      events: {
        'click .register': 'register'
      },

      initialize: function () {
        var self = this;
        $.get('/api/locations', function (locations) {
          self.$el.html(_.template(login, {
            message: 'please authenticate',
            locations: locations,
            available: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]
          }));
        });
      },

      register: function () {
        var self = this;
        var $message = $(this.$el.find('#message'));
        var info = {
          table: this.$el.find('#table').val(),
          location: this.$el.find('#location').val(),
          code: this.$el.find('#passcode').val(),
        };
        $.post('/api/tablets', info)
          .then(function (token) {
            if (typeof done === 'function') {
              delete info.code;
              info.token = token;
              done(info);
            }
            self.$el.remove();
          })
          .fail(function (res) {
            var error = res.responseJSON.message;
            var message = '<span class="shake">' + error + '</span>';
            $message.html(message);
          });
      }

    });

    var l = new Login();
    l.$el.appendTo('body');

  }

});
