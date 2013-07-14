/**
 * A basic widget for managing student requests.  Users will be able to
 * navigate different subjects and request aid for specific classes.
 *
 * Author: Abdullah Badahdah
 * Email:  abadahda@asu.edu
 *
 */

;(function ($, _, Backbone) { // closure start

    var Course = Backbone.Model.extend({
        initialize: function () {
        }
    });  

    var Courses = Backbone.Collection.extend({
        url: '/courses',
        model: Course
    });

    var CoursesView = Backbone.View.extend({
        initialize: function () {
            this.collection.fetch({ async: false});
        },
        collection: new Courses(),
        el: $('#body'),
        template: _.template($('#sub_menu').html()),
        render: function (id) {
        
            console.log(id);

            this.$el.html(this.template({ 
                courses: this.collection.where({ subject_id: "51cb732211c522e27c000002" }) 
            }));
        }
    });

    var Subject = Backbone.Model.extend({
        initialize: function () {
            this.set('link', '#subject/'+this.get('_id'));
        }
    });  

    var Subjects = Backbone.Collection.extend({
        url: '/subjects',
        model: Subject
    });

    var SubjectView = Backbone.View.extend({
        initialize: function () {
            this.collection.fetch({async: false});
        },
        collection: new Subjects(),
        el: $('#body'),
        template: _.template($('#main_menu').html()),
        render: function () {
            this.$el.html(this.template({ 
                subjects: this.collection.models 
            }));
        }
    });

    var MainView = Backbone.View.extend({
        el: $('#body'),

        events: {
            'click .subject': 'view_subject',
            'click .back': 'main_menu',
            'click .ask': 'enqueue'
        },
        
        subjects: new SubjectView(),
        courses: new CoursesView(),
        
        enqueue: function (e) {
            console.log($(e.currentTarget).data('id'));
            this.subjects.render();
        },

        initialize: function () {
            this.subjects.render();
        },
        main_menu: function () {
            this.subjects.render();
        },
        view_subject: function (e) {
            this.courses.render($(e.currentTarget).data('id'))
        },
    });

    var main = new MainView();

})(jQuery, _, Backbone); // closure end
