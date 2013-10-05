define(['models/base', 
        
    'collections/subjects',
    'collections/courses'
], 

function (Base, subjects, courses) {

    return Base.extend({
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
        }
    });  

});
