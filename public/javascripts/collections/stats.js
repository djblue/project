define(['backbone', 

    'models/stat',
], 

function (Backbone, Stat) {

    return Backbone.Collection.extend({

        model: Stat,

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

});
