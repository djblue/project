define(['backbone'], 

function (Backbone) {

    return Backbone.Model.extend({
        initialize: function () {
            this.set('link', '#subject/'+this.get('_id'));
        }
    });  

});
