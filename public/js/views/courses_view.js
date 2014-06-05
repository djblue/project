define(['jquery', 'underscore', 'backbone', 

    'js/collections/courses'
], 

function ($, _, Backbone, courses, main_menu, sub_menu) {

    return Backbone.View.extend({

        initialize: function () {
        },

        collection: courses,

        template: _.template($('#sub_menu').html()),

        render: function (id) {
        
            console.log(id);

            this.$el.html(this.template({ 
                courses: this.collection.where({ 
                    subject_id: String(id) }) 
            }));
        }

    });

});
