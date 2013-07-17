define(['jquery', 'underscore', 'backbone', 

    '../collections/subjects'
], 

function ($, _, Backbone, Subjects) {

    return Backbone.View.extend({

        initialize: function () {
            this.collection.fetch({async: false});
        },

        collection: new Subjects(),

        template: _.template($('#main_menu').html()),

        render: function () {

            this.$el.html(this.template({ 

                subjects: this.collection.models 

            }));
        }

    });

});
