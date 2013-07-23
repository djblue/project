define([ 'jquery', 'underscore', 'backbone', 'hammer',

    'views/time_view',
    'collections/questions'

], 

function ($, _, Backbone, Hammer, TimeView, questions) {

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
            this.collection.get(id).save({'completed': true});
            this.collection.remove(id);
        },

        cancel: function (e) {

            var id = $(e.currentTarget).data(id);

            if (confirm("Are you sure you want to remove the question from the queue?")) {
                this.collection.get(id).destroy();
            }
        },

        dragstart: function (e) {
            // Begin a dragging event.
            this.drag_el = $(e.currentTarget);

            if (this.drag_el == undefined) return;
            
            this.x = this.drag_el.offset().left;  
        },

        drag: function (e) {
            // Prevent default browser response.
            if (this.drag_el == undefined) return; 
            if (e.gesture == undefined) return;

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

            if (this.drag_el == undefined) return;
            if (e.gesture == undefined) return;

            e.gesture.stopDetect();

            // Reset object if threshold has not been met.
            if (this.drag_el.offset().left < this.drag_el.width()) {
                
                // Restore element to its initial position.
                this.drag_el.animate({left: 0}, 'fast');

            } else {

                // Trigger completed event.
                this.drag_el.trigger('completed'); 
            }

            delete this.drag_el;
        },
        
        template: _.template($('#sidebar').html()),

        collection:  questions,

        initialize: function () {
            // Initialize hammer plug-in for gestures.
            this.$el.hammer();

            var time = $('<div id=date-time>');
            var warn = $('<div id=warn>')
                .html('<div>Current Questions</div>')
                .append('<div>(Maximum 2)</div>');
            this.questions = $('<ul id=questions>');

            this.$el
                .append(time)
                .append(warn)
                .append(this.questions);

            new TimeView({ el: time });

            this.render();

            this.collection.on('add',this.render, this);
            this.collection.on('remove',this.render, this);
        },

        render: function () {
            this.questions.html( this.template({
                questions: this.collection.models
            }));
        },

        add: function (id) {

            var search = this.collection.where({
                course_id: id 
            });

            if (search.length != 0 ) {

                this.$el.find('[data-id="'+search[0].id+'"]')
                    .fadeOut()
                    .fadeIn();

            } else if (this.collection.length == 2 ) {

                this.$el.find('#warn')
                    .fadeOut()
                    .fadeIn();

            } else  {
                this.collection.create({ course_id: id }, {wait: true});
            }
        }

    });

});
