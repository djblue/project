define(['js/models/base', 'js/collections/courses'], 

function (Base, courses) {

    return Base.extend({

        idAttribute: "_id",

        urlRoot: 'questions',

        initialize: function () {
            this.course = courses.get(this.get('course_id'));
            this.subject = this.course.get('subject');
        },

        get_title: function () {
            return this.course.get('title');
        },

        get_label: function () {
            return  this.course.get('label');
        },

        get_color: function () {
            return this.subject.get('color');
        },

        isEqual: function (question) {

            if (!!question) {
                if (question.get('course_id') == this.get('course_id')) {
                    return true;
                }
            }

            return false;
        }

    }); 
});
