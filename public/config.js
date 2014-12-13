requirejs.config({
  baseUrl: '/',
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
    jquery:     'lib/jquery/jquery',
    backbone:   'lib/backbone/backbone',
    underscore: 'lib/underscore/underscore',
    hammer:     'lib/jquery-hammerjs/jquery.hammer-full.min',
    chart:      'lib/nnnick-chartjs/Chart',
    text:       'lib/text/text'
  }
});
