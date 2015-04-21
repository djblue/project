'use strict';

define([
  
  'jquery',
  'underscore',
  'backbone',
  'hammer',

  'js/views/time_view',
  'js/collections',
  'js/views/confirm',
  'js/tablet',
  'text!templates/sidebar.html'

], 

function ($, _, Backbone, Hammer, TimeView, collections, confirm, tablet, template) {

  return Backbone.View.extend({

    id: 'side',
    
    events: {
        'dragstart .question':  'dragstart',
        'drag':                 'drag',
        'dragend':              'dragend',
        'completed .question':  'completed',
        'click button':         'cancel',
        'click .recent':        'addRecent'
    },

    completed: function (e) {
      var id = $(e.currentTarget).data(id);
      collections.questions.complete(id);
    },

    cancel: function (e) {
      var id = $(e.currentTarget).data(id);
      confirm('Are you sure you?', function (yes) {
        if (yes) {
          collections.questions.cancel(id);
        }
      });
    },

    dragstart: function (e) {
      // Begin a dragging event.
      this.drag = $(e.currentTarget);

      if (this.drag !== undefined) {
        this.x = this.drag.offset().left;  
      }
    },

    drag: function (e) {
      // Prevent default browser response.
      if (this.drag === undefined) { return; }
      if (e.gesture === undefined) { return; }

      e.gesture.preventDefault();

      if (this.drag.html() !== e.currentTarget) {
        if (e.gesture.deltaX > 0) {
          this.drag.offset({
            left: this.x + e.gesture.deltaX
          });
        }
      } else {
        this.drag.animate({left: this.x}, 'fast');
      }
    },

    dragend: function (e) {

      if (this.drag === undefined) { return; }
      if (e.gesture === undefined) { return; }

      e.gesture.stopDetect();

      // Reset object if threshold has not been met.
      if (this.drag.offset().left < this.drag.width()) {
        
        // Restore element to its initial position.
        this.drag.animate({left: 0}, 'fast');

      } else {

        // Trigger completed event.
        this.drag.trigger('completed'); 
      }

      delete this.drag;
    },
    
    template: _.template(template),

    initialize: function () {
      // Initialize hammer plug-in for gestures.
      this.$el.hammer();

      this.area = $('<div>');

      this.$el
        .append((new TimeView()).$el)
        .append(this.area);

      collections.questions.on('change', this.render, this);
      collections.questions.on('remove', this.render, this);
      collections.questions.on('max', this.notifyMax, this);

      this.render();
    },

    render: function () {
      var self = this;
      tablet.getInfo(function (info) {
        self.area.html(self.template({
          info: info,
          questions: collections.questions.models,
          recent: collections.questions.recent
        }));
      });
    },

    // let the user know that they have already asked 
    // the maximum number of questions
    notifyMax: function () {
      this.$el.find('#warn').fadeOut().fadeIn();
    },

    // allow users to re-ask recently asked questions
    addRecent: function (e) {
      var id = $(e.currentTarget).data('id');
      collections.questions.ask(id);
    }

  });

});
