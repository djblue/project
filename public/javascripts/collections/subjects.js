define(['backbone', '../models/subject'], 

function (Backbone, Subject) {

    return Backbone.Collection.extend({
        url: '/subjects',
        model: Subject
    });

});
