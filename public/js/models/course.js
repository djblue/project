define(['js/models/base', 'js/collections/subjects'],

function (Base, subjects) {

    return Base.extend({

        initialize: function () {},

        get_subject: function () {
            return subjects.get(this.get('subject_id'));
        },

        get_label: function () {
            return this.get('subject').get('prefix') + ' ' +
                this.get('number');
        }

    });  

});
