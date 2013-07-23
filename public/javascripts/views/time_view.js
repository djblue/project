define(['jquery', 'backbone'],

function ($, Backbone) {

    return Backbone.View.extend({

        initialize: function () {

            this.day  = $('<div id=day>');
            this.date = $('<div id=date>');
            this.time = $('<div id=time>');

            this.$el
                .append(this.day)
                .append(this.date)
                .append(this.time);

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
            this.time.html(date.toLocaleTimeString());
            this.date.html(months[date.getMonth()] +' '+ date.getDate() +
            ', ' + date.getYear());
            this.day.html(days[date.getDay()]);
        }

    });
        

});
