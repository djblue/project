// A widget for monitoring student system statistics. Users will be able
// to navigate different stats with respect to time and subject.

require(['/config.js'], function () {

    require([
        'jquery',
        'backbone',
        'js/collections/stats',
        'js/views/statsview',
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
                    term: (!!term)? term : "FA2013",
                    week: week,
                    day:  day
                }; 

                if (!!cache[JSON.stringify(obj)]) {
                    body.html(cache[JSON.stringify(obj)].$el);
                } else {

                    var span = 'weekly';
                    if (!!obj.term) {
                        if (!!obj.week) {
                            span = 'daily';
                            if (!!obj.day) {
                                span = 'hourly';
                            }
                        }
                    }

                    var stats = new Stats[span](); 
                    stats.fetch({ 
                        data: obj,
                        success: function () {
                            cache[JSON.stringify(obj)] = new StatsView({
                                url: obj,
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
});
