// A basic widget for managing student requests.  Users will be able to
// navigate different subjects and request aid for specific classes.

define(['jquery' , 'underscore', 'backbone', 'chart',

        'collections/subjects',
        'text!templates/statstable.ejs'

],

function ($, _, Backbone, Chart, subjects, table) {


    return Backbone.View.extend({

        initialize: function () {

            this.$el.html(_.template(table, {
                current: _.values(this.options.url).filter(function(n){return n}).join('/')+"/",
                subjects: subjects.models,
                data: this.collection.models
            }));

            var bar = this.$el.children('canvas').get(0).getContext("2d");

            data = {
                labels: _.map(this.collection.models, function(obj) {
                    return obj.get('formatted');
                }),
                datasets: [
                    {
                        fillColor : "rgba(220,220,220,0.5)",
                        strokeColor : "maroon",
                        pointColor : "rgba(220,220,220,1)",
                        pointStrokeColor : "#fff",
                        data : _.map(this.collection.models, function(obj) {
                            return obj.get('total');
                        })
                    }
                ]
            };
                
            new Chart(bar).Bar(data);
        }

    });

});
