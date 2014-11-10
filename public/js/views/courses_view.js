define(['jquery', 'underscore', 'backbone', 

  'js/courses'
], 

function ($, _, Backbone, courses, main_menu, sub_menu) {

  return Backbone.View.extend({

    initialize: function () {
    },

    collection: courses,

    template: _.template($('#sub_menu').html()),

    render: function (id) {
      this.$el.html(this.template({ 
        courses: this.collection.where({ subject: String(id) }) 
      }));
    }

  });

});
