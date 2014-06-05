define([ 'jquery', 'underscore', 'backbone', 'hammer',

    'js/views/time_view',
    'js/collections/questions',
    'text!templates/sidebar.html'

], 

function ($, _, Backbone, Hammer, TimeView, questions, template) {

    return Backbone.View.extend({

        id: 'side',
        
        events: {
            'dragstart .question':  'dragstart',
            'drag':                 'drag',
            'dragend':              'dragend',
            'completed .question':  'completed',
            'click button':         'cancel',
            'click .recent':        'add'
        },

        completed: function (e) {
            var id = $(e.currentTarget).data(id)
              , q  = this.collection.get(id);

            q.save({'completed': true});

            if ( !q.isEqual(this.recent[0]) ) {
                this.recent[1] = this.recent[0];
                this.recent[0] = q;
            }
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

            if (this.drag_el === undefined) return;
            
            this.x = this.drag_el.offset().left;  
        },

        drag: function (e) {
            // Prevent default browser response.
            if (this.drag_el === undefined) return; 
            if (e.gesture === undefined) return;

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

            if (this.drag_el === undefined) return;
            if (e.gesture === undefined) return;

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
        
        template: _.template(template),

        collection:  questions,

        initialize: function () {
            // Initialize hammer plug-in for gestures.
            this.$el.hammer();

            this.area = $('<div>');
            this.recent = [];

            this.$el
                .append((new TimeView()).$el)
                .append(this.area);


            this.render();

            this.collection.on('add',this.render, this);
            this.collection.on('remove',this.render, this);

            _.bindAll(this, 'add');
        },

        render: function () {
            this.area.html( this.template({
                questions: this.collection.models,
                recent: this.recent
            }));
        },

        add: function (id) {


            var search = this.collection.where({
                course_id: id
            });

            if (search.length !== 0 ) {

                this.$el.find('[data-id="'+search[0].id+'"]')
                    .fadeOut()
                    .fadeIn();

            } else if (this.collection.length == 2 ) {

                this.$el.find('#warn')
                    .fadeOut()
                    .fadeIn();

            } else  {
                this.collection.create({ course_id: id, table_id: "test" }, {wait: true});
            }
        }

    });

});
