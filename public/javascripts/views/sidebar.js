define([ 'jquery', 'underscore', 'backbone', 'hammer'], 

function ($, _, Backbone, Hammer) {

    var Question = Backbone.Model.extend({

        idAttribute: "_id",

        urlRoot: 'questions',

        initialize: function () {

            /*
            var date = new Date();
            this.set('_id', date.getTime());
            */

            this.on('remove', function () {
                this.destroy({
                    success: function () {
                        console.log('success');
                    },
                    error: function (e) {
                        console.log('error');
                    }
                });
            }, this);
        }

    }); 

    var Questions = Backbone.Collection.extend({
        model: Question
    });

    /*
    questions.add([
        {time: "10:45 AM", label: "MAT 343", title: "Linear Algebra"},
        {time: "10:55 AM", label: "CSE 205", title: "Introduction to Object Oriented Programming"}
    ]);
    */

    return Backbone.View.extend({
        
        events: {
            'dragstart .question':  'dragstart',
            'drag':                 'drag',
            'dragend':              'dragend',
            'completed .question':  'completed',
            'click button':         'cancel'
        },

        completed: function (e) {
            var id = $(e.currentTarget).data(id);
            this.collection.remove(id);
        },

        cancel: function (e) {

            var id = $(e.currentTarget).data(id);
            console.log(id);

            if (confirm("Are you sure you want to remove the question from the queue?")) {
                this.collection.remove(id);
            }
        },

        dragstart: function (e) {
            // Begin a dragging event.
            this.drag_el = $(e.currentTarget);
            this.x = this.drag_el.offset().left;  
        },

        drag: function (e) {
            // Prevent default browser response.
            e.gesture.preventDefault();

            if (this.drag_el.html() != e.currentTarget) {
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

            delete this.drag_el;
        },
        
        template: _.template($('#sidebar').html()),

        collection:  new Questions(),

        initialize: function () {
            // Initialize hammer plug-in for gestures.
            this.$el.hammer();

            this.render();

            this.collection.on('add',this.render, this);
            this.collection.on('remove',this.render, this);
        },

        render: function () {
            this.$el.html( this.template({
                questions: this.collection.models
            }));
            console.log('rendering sidebar');
        },

        add: function (course, subject) {

            var search = this.collection.where({
                label: course.get('number') 
            });

            if (search.length != 0 ) {

               alert('Question Already in Queue!');

            } else if (this.collection.length == 2 ) {

               alert('Maximum Questions Asked!') 

            } else  {
                this.collection.create({
                    course_id: course.get('_id'),
                    table: 1, 
                    label: course.get('number'), 
                    title: course.get('title')
                }, {wait: true});
            }
        }

    });

});
