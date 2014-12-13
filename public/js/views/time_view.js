'use strict';

define(['jquery', 'backbone'],

function ($, Backbone) {

    return Backbone.View.extend({

        initialize: function () {

            this.day  = $('<h1 id=day>');
            this.date = $('<h2 id=date>');
            //this.time = $('<div id=time>');

            this.$el
                .append(this.day)
                .append(this.date);
                //.append(this.time);

            this.update();

            var self = this;
            setInterval(function () {
                self.update();
            }, 1000);
            
        },
        update: function () {

            var months = [
                'January',
                'February',
                'March',
                'April',
                'May',
                'June',
                'July',
                'August',
                'September',
                'October',
                'November',
                'December'
            ];

            var days = [
                'Sunday',
                'Monday', 
                'Tuesday', 
                'Wednesday', 
                'Thursday', 
                'Friday', 
                'Saturday' 
            ];

            var date = new Date();
            //this.time.html(date.toLocaleTimeString());
            this.date.html(months[date.getMonth()] +' '+ date.getDate() +
            ', ' + date.getFullYear());
            this.day.html(days[date.getDay()]);
        }

    });
        

});
