define(['backbone', 'js/models/subject'], 

function (Backbone, Subject) {

    var Subjects = Backbone.Collection.extend({
        initialize: function () {
            // Ensure data is avaliable before leaving module.
            this.fetch({ async: false });
        },
        url: '/subjects',
        model: Subject
    });

    return new Subjects();

});
