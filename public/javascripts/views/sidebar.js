define([ 'jquery', 'underscore', 'backbone', ], 

function ($, _, Backbone) {

    var Question = Backbone.Model.extend(); 

    var Questions = Backbone.Collection.extend({
        model: Question
    });

    var questions = new Questions();

    questions.add([
        {time: new Date(), label: "MAT 343", text: "Linear Algebra"},
        {time: new Date(), label: "CSE 205", text: "Introduction to Object Oriented Programming"}
    ]);

    return Backbone.View.extend({
        
        template: _.template($('#sidebar').html()),

        collection: questions,

        initialize: function () {
            this.render();
        },

        render: function () {
            this.$el.html( this.template({
                questions: this.collection.models
            }));
        }

    });

});
