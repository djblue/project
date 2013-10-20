/**
 * A basic widget for managing student requests.  Users will be able to
 * navigate different subjects and request aid for specific classes.
 *
 * Author: Abdullah Badahdah
 * Email:  abadahda@asu.edu
 *
 */
require(['/javascripts/config.js'], function () {

    require([
        'jquery',
        'collections/subjects',
        'collections/courses',
        'views/requestmenu',
        'views/sidebar' 
    ],

    function ($, subjects, courses, RequestMenu, Sidebar) {

        var side = new Sidebar();

        $('#body')
            .append(side.$el)
            .append(new RequestMenu({
                subjects: subjects, 
                courses: courses,
                onAsk: side.add
            }).$el);

    });
});
