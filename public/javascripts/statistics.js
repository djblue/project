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
    'views/data',
    'views/pieChart'


],

function ($, _, Backbone, barChart, data, pieChart) {
    barChart
    .createBarGraph("#bar","Questions", data.barData, 3, data.color, "#034769");
    pieChart
    .drawPie("Pie1", data.pieData, "#pie", data.color1, 10, 100, 5, 0);
});
