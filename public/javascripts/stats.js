// A widget for monitoring student system statistics. Users will be able
// to navigate different stats with respect to time and subject.

requirejs.config({
    baseUrl: '/javascripts',
    shim: {
        'backbone': {
            deps: ['underscore', 'jquery'],
            exports: 'Backbone'
        },
        'underscore': {
            exports: '_'
        }
    },
    paths: {
        jquery:     'lib/jquery-2.0.2.min',
        backbone:   'lib/backbone-min',
        underscore: 'lib/underscore-min',
        text:       'lib/text'
    }
});

requirejs(['jquery', 'backbone',

        'collections/stats',
        'views/statsview',
        'text!templates/statshelp.ejs'
],

function ($, Backbone, Stats, StatsView, help) {

    var cache = []
      , body  = $('#body');

    // main application router
    var StatsRoutes = Backbone.Router.extend({
        routes: {
            'help':                         'showhelp',
            '(:term)(/)(:week)(/)(:day)':   'viewstats'
        },
        showhelp: function () {
            body.html(help);
        },
        viewstats: function (term, week, day) {
            var obj = {
                term: term,
                week: week,
                day:  day
            }; 

            if (!!cache[JSON.stringify(obj)]) {
                body.html(cache[JSON.stringify(obj)].$el);
            } else {
                var stats = new Stats(); 
                stats.fetch({ 
                    data: obj,
                    success: function () {
                        cache[JSON.stringify(obj)] = new StatsView({
                            collection: stats
                        });
                        body.html(cache[JSON.stringify(obj)].$el);
                    },
                    error: function (err) {
                        console.log(err);
                    }
                });
            }
        }
    });

    new StatsRoutes();

    Backbone.history.start();

});
