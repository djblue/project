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

    'collections/questions',
    '/socket.io/socket.io.js'

],

function ($, _, Backbone, questions, io) {


    var socket   = io.connect(); // Defaults to server
    var template = _.template($('#queue_item').html());
    var body     = $('#body');

    socket.on('questions', function (data) {
        
        questions.reset();
        _.each(data, function (question) { questions.add(question); });
        console.log(questions.models);
        body.html(template({ questions: questions.models }));

    });

});
