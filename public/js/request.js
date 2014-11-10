// A basic widget for managing student requests. Users 
// will be able to navigate different subjects and request aid 
// for specific classes.
require(['/config.js'], function () {

  require([
    'jquery',
    'js/views/navmenu',
    'js/views/sidebar',
    'js/views/login'
  ],

  function ($, Menu, Sidebar, Login) {
    $('#body')
      .append(new Sidebar().$el)
      .append(new Menu().$el)
      .append(new Login().$el)
      ;
  });

});
