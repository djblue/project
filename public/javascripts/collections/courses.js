define(['backbone', '../models/course'], 

function (Backbone, Course) {

    return Backbone.Collection.extend({
        url: '/courses',
        model: Course
    });

});
