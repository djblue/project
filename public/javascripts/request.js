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
        hammer:     '/lib/jquery.hammer.min',
        text:       '/lib/text'
    }

});

requirejs(['jquery' , 'underscore', 'backbone', 'hammer',

    'views/courses_view', 
    'views/subjects_view', 
    'views/sidebar' 

],

function ($, _, Backbone, hammer, CoursesView, SubjectView, Sidebar) {

    var MainView = Backbone.View.extend({

        el: $('#body'),

        events: {

            'tap .back':    'main_menu',
            'tap .ask':     'enqueue',
            'tap .subject': 'view_subject',
            'change input': 'register'
        },

        start_subject: function (e) {
            $(e.currentTarget).css('box-shadow','none');
        },
         
        end_subject: function (e) {
            $(e.currentTarget).find('h2').attr('id','subject-active');
            this.courses.render($(e.currentTarget).data('id'));
        },

        register: function (e) {
            this.table_id = $(e.currentTarget).val();
            console.log(this.table_id);
            this.main_menu();
        },
        
        enqueue: function (e) {
            this.sidebar.add(e);
            this.main_menu();
        },

        initialize: function () {
            
            this.$el.hammer();

            var side  = $('<div id=side>');
            this.menus = $('<div id=menus>');
            
            this.$el
                .append(side)
                .append(this.menus);

            this.subjects = new SubjectView({ 
                el: this.menus
            });

            this.courses = new CoursesView({ 
                el: this.menus
            });

             
            this.sidebar = new Sidebar({
                el: side
            });

            this.subjects.render();
            //menus.html('Please Enter Table Number <input />');
        },

        main_menu: function () {
            this.subjects.render();
        },
        view_subject: function (e) {
            //this.menus.scrollTop(0);
            e.stopPropagation();
            $(e.currentTarget).find('h2').attr('id','subject-active');
            $(e.currentTarget).css('box-shadow','none');
            var self = this;
            setTimeout((function (e) {
                return function () {
                    self.courses.render($(e.currentTarget).data('id'))
                };
            })(e), '100');
        }
    });

    var main = new MainView();

});
