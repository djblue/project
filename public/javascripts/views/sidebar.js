define([ 'jquery', 'underscore', 'backbone', ], 

function ($, _, Backbone) {

    var Question = Backbone.Model.extend(); 

    var Questions = Backbone.Collection.extend({
        model: Question
    });

    var questions = new Questions();

    questions.add([
        {time: "10:45 AM", label: "MAT 343", title: "Linear Algebra"},
        {time: "10:55 AM", label: "CSE 205", title: "Introduction to Object Oriented Programming"}
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
