/**
 *
 * Author: Ismael Mercado
 * Email:  imercado@asu.edu
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
        'd3': {
            exports: 'd3'
        }
    },
    paths: {
        jquery:     '/lib/jquery-2.0.2.min',
        backbone:   '/lib/backbone-min',
        underscore: '/lib/underscore-min',
        hammer:     '/lib/jquery.hammer.min',
        d3:         '/lib/d3.v3.min'
    }

});

requirejs(['jquery' , 'underscore', 'backbone',

    'views/barChart',
    'views/data'


],

function ($, _, Backbone, barChart, data) {
    barChart
    .createBarGraph("#bar","Questions", data.data, 3, data.color, "#034769");

});
