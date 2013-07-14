/**
 * A basic jQuery widget for managing student requests.
 * Users will be able to navigate different subjects
 * and request aid for specific classes.
 * 
 * Author: Abdullah Badahdah
 * Email:  abadahda@asu.edu
 */

;(function ($) { // widget closure

    var defaults = {
        list: [],
        testing: false
    };

    // Plug-in constructor;
    var Plugin = function ($el, options) {

        this.$el = $el;
        this.list = options.list;

        delete options.list;

        this.options = $.extend({}, defaults, options);

        if (!this.options.testing) {
            this.init();
        }

        return this; // Return the newly created object.

    };

    // Public methods for the plug-in.
    Plugin.prototype = {

        // Initialize the widget by showing the main menu.
        init: function () {
            this.main_menu();
        },

        // Display the main menu.
        main_menu: function() {

            this.$el.html(''); // Clear the widget container.
            var that = this;   // Set a scope reference.

            // Iterate through the class list, showing only the
            // categories.
            $(this.list).each(function (i, obj) {

                // Initialize a new category button.
                var $el = $("<div/>").addClass("category");
                $el.html("<h2>"+obj.category+"</h2>");

                // Add the event handler to navigate to sub-menu.
                $el.click( (function (pre, classes) {
                    return function () { 
                        that.show_menu(pre, classes);
                    }
                })(obj.prefix, obj.classes) );

                that.$el.append($el); // Actually show the main menu. 
            });

            this.$el.append("<div id=\"clear\"></div>");
        },

        show_menu: function(pre, classes) {

            var that = this;
            var $ul = $("<ul class=\"classes\"></ul>");
            var button = $('<li>Go Back</li>');
            var $li;


            button.click(function () {
                that.main_menu();
            });

            $ul.append(button);

            for (var i = 0; i < classes.length; i++)
            {
                $li = $("<li>");
                $li.html(pre+" "+classes[i].number+" : "+classes[i].title);
                $li.click((function (data) { 
                    return function () {
                       alert(data.title); 
                        that.main_menu();
                    };
                })(classes[i]));
                $ul.append($li);
            }

           this.$el.html('');
           this.$el.append($ul);
        },

        request: function() {
            
        },
    };


    // Expose jQuery plug-in.
    $.fn.request = function (options) {
        // The plugin hasn't already been applied
        if (this.data('hasPane') != undefined) {
            console.log('Pane has already been applied to' + this);
            return false;
        } else {
            this.data('hasPane', true);
            // breaks traditional jquery chaining
            return new Plugin(this, options);
        }
    };


})(jQuery); // end of widget
