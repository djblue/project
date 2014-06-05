define(['backbone', 

    'js/models/stat',
    'js/collections/courses'
], 

function (Backbone, Stat, courses) {

    var BaseStatistics = Backbone.Collection.extend({

        initialize: function () {
        },

        // total number of questions for each subject
        totals: function () {
            var temp = [];
           _.each(this.models, function (stat) {
                temp[temp.length] = stat.get('subjects');
           });

           return temp;
        },

        // totals number of questions
        total: function () {
            return _.reduce(this.models, function (memo, stat) {
                return memo + stat.get('total');
            }, 0);
        },

        // average number of seconds per question
        avg_time: function () {
            var time = _.reduce(this.models, function (memo, stat) {
                return memo + stat.get('time');
            }, 0);

            return (time/this.total()).toFixed(2);
        },


        // get the n most popular subjects 
        // where n is optional
        top: function (n) {
            var list = _.reduce(this.models, function (memo, obj) {
                _.each(_.keys(obj.get('questions')), function (i) {
                    if (!!memo[i])
                        memo[i] += obj.get('questions')[i];
                    else
                        memo[i] = obj.get('questions')[i];
                });
                return memo;
            }, {});
            
            list = _.map(list, function (value, key) {
                var course = courses.findWhere({"_id": key});
                return {
                    "course_id": key,
                    "title": course.get('title'),
                    "label": course.get('label'),
                    "count": value
                };
            });

            list = _.sortBy(list, 'count').reverse();

            return _.first(list, 5);
        },

        // generate totals as tsv
        tsv: function () {
            return _.reduce(this.totals(), function (memo, obj) {
                return memo + obj.join("\t") + "\n";
            }, "");
        },

        // download data as tsv
        download: function () {
            return 'data:Application/octet-stream,' +
                encodeURIComponent(this.tsv());
        },

        url: 'statistics'
    });

    return {
        weekly: BaseStatistics.extend({
            model: Stat.weekly
        }),
        daily: BaseStatistics.extend({
            model: Stat.daily
        }),
        hourly: BaseStatistics.extend({
            model: Stat.hourly
        }),
    };

});
