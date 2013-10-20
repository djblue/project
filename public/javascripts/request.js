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
        },
        'hammer': {
            deps: ['jquery'],
            exports: 'hammer'
        }
    },
    paths: {
        jquery:     'components/jquery/jquery',
        backbone:   'components/backbone/backbone',
        underscore: 'components/underscore/underscore',
        hammer:     'components/hammerjs/dist/jquery.hammer',
        text:       'components/text/text'
    }
});

requirejs([

    'jquery',
    'collections/subjects',
    'collections/courses',
    'views/requestmenu',
    'views/sidebar' 

],

function ($, subjects, courses, RequestMenu, Sidebar) {

    var side = new Sidebar();

    $('#body')
        .append(side.$el)
        .append(new RequestMenu({
            subjects: subjects, 
            courses: courses,
            onAsk: side.add
        }).$el);

});
