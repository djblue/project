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

    'collections/courses',
    '/socket.io/socket.io.js'

],

function ($, _, Backbone, Courses, io) {


    var socket   = io.connect(); // Defaults to server
    var template = _.template($('#queue_item').html());
    var body     = $('#body');

    var courses = new Courses();
    courses.fetch({async: false});

    socket.on('questions', function (data) {

        body.html(template({ items: data , courses: courses }));

    });

});
