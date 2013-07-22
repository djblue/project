/**
 * A basic widget for managing student requests.  Users will be able to
 * navigate different subjects and request aid for specific classes.
 *
 * Author: Abdullah Badahdah
 * Email:  abadahda@asu.edu
 *
 */

requirejs.config({
    baseUrl: '/javascripts',
    shim: {
        'backbone': {
            deps: ['underscore', 'jquery'],
            exports: 'Backbone'
        },
        'underscore': {
            exports: '_'
        }
    },
    paths: {
        jquery:     '/lib/jquery-2.0.2.min',
        backbone:   '/lib/backbone-min',
        underscore: '/lib/underscore-min',
        hammer:     '/lib/jquery.hammer.min'
    }

});

requirejs(['jquery' , 'underscore', 'backbone', 

    'views/courses_view', 
    'views/subjects_view', 
    'views/sidebar' 

],

function ($, _, Backbone, CoursesView, SubjectView, Sidebar) {

    var MainView = Backbone.View.extend({

        el: $('#body'),

        events: {
            'click .subject': 'view_subject',
            'click .back': 'main_menu',
            'click .ask': 'enqueue'
        },
        
        enqueue: function (e) {
            var id = $(e.currentTarget).data('id');
            this.sidebar.add(id);
            this.main_menu();
        },

        initialize: function () {

            var side  = $('<div id=side>');
            var menus = $('<div id=menus>');
            
            this.$el
                .append(side)
                .append(menus);

            this.subjects = new SubjectView({ 
                el: menus
            });

            this.courses = new CoursesView({ 
                el: menus
            });

             
            this.sidebar = new Sidebar({
                el: side
            });

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

});
