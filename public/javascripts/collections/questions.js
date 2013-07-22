define(['backbone', 'models/question'], 

function (Backbone, Question) {

    var Questions =  Backbone.Collection.extend({
        model: Question
    });

    return new Questions();
});
