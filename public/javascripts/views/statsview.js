// A basic widget for managing student requests.  Users will be able to
// navigate different subjects and request aid for specific classes.

define(['jquery' , 'underscore', 'backbone'

],

function ($, _, Backbone, hammer, subjects, courses, helptext) {

    return Backbone.View.extend({

        initialize: function () {
            console.log(this.collection);
        }

    });

});
