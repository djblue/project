'use strict';

define([

  'underscore',
  'backbone',
  'js/views/login'

], function (_, Backbone, login) {

  // get client info
  // may already be present in local storage, or 
  // the user might have to prompted
  var fns = [];
  var getInfo = function (key) {
    return function (done) {
      var info = JSON.parse(localStorage.getItem('info'));
      if (info !== null) {
        dispatcher.trigger('info:table', info.table);
        dispatcher.trigger('info:location', info.location);
        dispatcher.trigger('info:token', info.token);
        done((key !== undefined)? info[key] : info);
      } else {
        if (fns.length === 0) {
          fns.push(done);
          login(function (info) {
            localStorage.setItem('info', JSON.stringify(info));
            dispatcher.trigger('info:table', info.table);
            dispatcher.trigger('info:location', info.location);
            dispatcher.trigger('info:token', info.token);
            while (fns.length !== 0) {
              fns.pop()((key !== undefined)? info[key] : info);
            }
          });
        } else {
          fns.push(done);
        }
      }
    };
  }

  var Tablet = Backbone.Model.extend({
    initialize: function () {
      var info = JSON.parse(localStorage.getItem('info'));
      if (info !== null) {
        this.set(info);
      } else {
        login(function (info) {
          localStorage.setItem('info', JSON.stringify(info));
          this.set(info);
        }.bind(this));
      }
    },
    clear: function () {
      this.clear();
      localStorage.removeItem('info');
    }
  });

  // different info unique to a tablet
  var dispatcher = _.extend({

    // access tablet info asynchronously as it might 
    // not be currently available
    getTable: getInfo('table'),
    getLocation: getInfo('location'),
    getToken: getInfo('token'),
    getInfo: getInfo(),

    // clear info, useful when using a token that has expired
    // and you want the client to reenter credentials
    clear: function () {
      localStorage.removeItem('info');
    }
  }, Backbone.Events);

  return dispatcher;
  //return new Tablet();

});
