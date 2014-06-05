define(['jquery', 'underscore', 'backbone', 

    'js/collections/subjects'
], 

function ($, _, Backbone, subjects) {

    return Backbone.View.extend({

        initialize: function () {
        },

        collection: subjects,

        template: _.template($('#main_menu').html()),

        render: function () {

            this.$el.html(this.template({ 

                subjects: this.collection.models 

            }));
        }

    });

});
