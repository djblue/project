requirejs(['/javascripts/config.js'], function () {
    requirejs(['jquery' , 'underscore', 'backbone', 

        'collections/questions',
        'text!templates/queue.ejs',

    ],

    function ($, _, Backbone, questions, queue) {


        var socket   = io.connect(); // Defaults to server
        var template = _.template(queue);
        var body     = $('#body');

        socket.on('questions', function (data) {
            questions.reset();
            _.each(data, function (question) { questions.add(question); });
            body.html(template({ questions: questions.models }));
        });

    });
});
