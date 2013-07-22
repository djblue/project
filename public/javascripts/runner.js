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

requirejs(['jasmine-html'], function (jasmine) {

    jasmine.getEnv().addReporter(new jasmine.HtmlReporter());

    var specs = []; // An array to of specs to run. 

    // Model specs.
    specs.push('specs/models/base');
    specs.push('specs/models/course');
    specs.push('specs/models/question');

    // Collections specs.
    specs.push('specs/collections/subjects');
    specs.push('specs/collections/courses');

    // View specs
    //specs.push('specs/views/sidebar');
    
    // Load the specs and run them.
    require(specs, function () { jasmine.getEnv().execute(); });

});
