define([
    'js/models/base', 
    'js/collections/subjects',
    'js/collections/courses'
], 

function (Base, subjects, courses) {

    var BaseStatistic = Base.extend({
        idAttribute: "_id",

        initialize: function () {
        },

        // get the subject summary
        get_subjects: function () {
            var self = this;
            return _.map(subjects.models, function (subject) {
                return _.reduce(_.pairs(self.get('questions')), function (memo, question) {
                    if (courses.get(question[0]).get('subject').id === subject.id) {
                        return memo + question[1];
                    } else { return memo; }
                }, 0);
            });
        },
    });  

    return {
        weekly: BaseStatistic.extend({
            get_formatted: function () {
                return "Week " + this.attributes.label;
            },
        }),
        daily: BaseStatistic.extend({
            get_formatted: function () {
                var days = [
                    'Sunday',
                    'Monday',
                    'Tuesday',
                    'Wednesday',
                    'Thursday',
                    'Friday',
                    'Saturday'
                ];
                return days[this.attributes.label];
            }
        }),
        hourly: BaseStatistic.extend({
            get_formatted: function () {
                if (Number(this.attributes.label) > 12) {
                    return (Number(this.attributes.label) - 12 ) + " P.M.";
                } else {
                    return this.attributes.label + " A.M.";
                }
            },
            get_label: function () {
                return null;
            }
        })
    };

});
