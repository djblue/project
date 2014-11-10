requirejs(['/config.js'], function () {
  requirejs(['jquery' , 'underscore', 'backbone', 

    'text!templates/queue.html',
    'text!templates/location.html',

  ],

  function ($, _, Backbone, queue, location) {

    var template = _.template(queue);
    var body     = $('#body');

    $.get('/api/locations')
      .then(function (locations) {
        body.html(_.template(location, {
          locations: locations
        }));
        body.find('.location').click(function (e) {
          var id = $(e.currentTarget).data('id');
          body.html(template({ questions: [] }));
          debugger
          var ns = io.connect('/' + id); // Defaults to server
          ns.on('questions', function (questions) {
            body.html(template({ questions: questions }));
          });
        });
      });

  });
});
