define(['backbone', 

    'models/stat',
], 

function (Backbone, Stat) {

    var BaseStatistics = Backbone.Collection.extend({

        initialize: function () {
        },

        totals: function () {
            var temp = [];
           _.each(this.models, function (stat) {
                temp[temp.length] = stat.get('subjects');
           });

           return temp;
        },

        url: 'statistics'
    });

    return {
        weekly: BaseStatistics.extend({
            model: Stat['weekly']
        }),
        daily: BaseStatistics.extend({
            model: Stat['daily']
        }),
        hourly: BaseStatistics.extend({
            model: Stat['hourly']
        }),
    }

});
