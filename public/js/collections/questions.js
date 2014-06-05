define(['backbone', 'js/models/question'], 

function (Backbone, Question) {

    var Questions =  Backbone.Collection.extend({
        initialize: function () {
            this.fetch({async: false});
        },
        model: Question,
        url: 'squestions' // Get questions from the current session.
    });

    return new Questions();
});
