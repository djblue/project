define(['models/base', 'collections/courses'], 

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
        }

    }); 
});
