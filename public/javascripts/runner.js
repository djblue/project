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
        'jasmine': {
            exports: 'jasmine'
        },
        'jasmine-html': {
            deps: ['jasmine'],
            exports: 'jasmine'
        }
    },
    paths: {
        'jquery':       '/lib/jquery-2.0.2.min',
        'underscore':   '/lib/underscore-min',
        'backbone':     '/lib/backbone-min',
        'hammer':       '/lib/jquery.hammer.min',
        'jasmine':      '/lib/jasmine',
        'jasmine-html': '/lib/jasmine-html'
    }

});

requirejs(['jasmine', 'jasmine-html',

    'javascripts/specs/example.js'

], 

function (jasmine) {

    jasmine.getEnv().addReporter(new jasmine.HtmlReporter());
    jasmine.getEnv().execute();

});
