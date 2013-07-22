define(['backbone', '../models/course'], 

function (Backbone, Course) {

    var Courses = Backbone.Collection.extend({
        initialize: function () {
            // Ensure data is avaliable before leaving module.
            this.fetch({ async: false });
        },
        url: '/courses',
        model: Course
    });

    return new Courses();

});
