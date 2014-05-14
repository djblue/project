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
        },
        'chart': {
            exports: 'Chart'
        }
    },
    paths: {
        jquery:     'components/jquery/jquery',
        backbone:   'components/backbone/backbone',
        underscore: 'components/underscore/underscore',
        hammer:     'components/jquery-hammerjs/jquery.hammer-full.min',
        chart:      'components/nnnick-chartjs/Chart',
        text:       'components/text/text'
    }
});
