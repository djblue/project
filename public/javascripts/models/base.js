define(['backbone'],

function (Backbone) {

    return Backbone.Model.extend({

        idAttribute: "_id",

        initialize: function () {
        },

        get: function (attribute) { 

            if (typeof this["get_"+attribute] == 'function') {
                return this["get_"+attribute](); 

            } else {
                return Backbone.Model.prototype.get.call(this, attribute);
            }
        }

    });  

});
