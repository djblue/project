'use strict';

// A basic widget for managing student requests. Users 
// will be able to navigate different subjects and request aid 
// for specific classes.
require(['/config.js'], function () {

  require([
    'jquery',
    'js/views/navmenu',
    'js/views/sidebar',
  ],

  function ($, Menu, Sidebar) {
    $('#body')
      .append(new Sidebar().$el)
      .append(new Menu().$el)
      ;
  });

});
