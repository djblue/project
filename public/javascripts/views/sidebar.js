define([ 'jquery', 'underscore', 'backbone', 'hammer'], 

function ($, _, Backbone, Hammer) {

    var Question = Backbone.Model.extend(); 

    var Questions = Backbone.Collection.extend({
        model: Question
    });

    var questions = new Questions();

    questions.add([
        {time: "10:45 AM", label: "MAT 343", title: "Linear Algebra"},
        {time: "10:55 AM", label: "CSE 205", title: "Introduction to Object Oriented Programming"}
    ]);

    return Backbone.View.extend({
        
        events: {
            'dragstart  .question': 'dragstart',
            'drag':      'drag',
            'dragend':   'dragend',
            'completed  .question': 'completed',
            'click button': 'click'
        },

        dragstart: function (e) {
            // Begin a dragging event.
            this.drag_el = $(e.currentTarget);
            this.x = this.drag_el.offset().left;  
        },

        drag: function (e) {
            // Prevent default browser response.
            e.gesture.preventDefault();

            if (this.drag_el.html() != e.currentTarget)
            {
                if (e.gesture.deltaX > 0) {
                    this.drag_el.offset({
                        left: this.x + e.gesture.deltaX
                    });
                }
            } else {
                this.drag_el.animate({left: this.x}, 'fast');
            }

        },

        dragend: function (e) {

            e.gesture.stopDetect();

            // Reset object if threshold has not been met.
            if (this.drag_el.offset().left < this.drag_el.width()) {
                
                // Restore element to its initial position.
                this.drag_el.animate({left: this.x}, 'fast');

            } else {

                // Trigger completed event.
                this.drag_el.trigger('completed'); 
            }
        },
        
        template: _.template($('#sidebar').html()),

        collection: questions,

        initialize: function () {
            // Initialize hammer plug-in for gestures.
            this.$el.hammer();

            this.render();
        },

        render: function () {
            this.$el.html( this.template({
                questions: this.collection.models
            }));
        }

    });

});
