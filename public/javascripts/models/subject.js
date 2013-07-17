define(['backbone'], 

function (Backbone) {

    return Backbone.Model.extend({
        idAttribute: "_id",

        initialize: function () {
            this.set('link', '#subject/'+this.get('_id'));
        }
    });  

});
