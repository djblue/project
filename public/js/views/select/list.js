'use strict';

define([

  'jquery',
  'underscore',
  'backbone',
  'text!./list.html'

], function ($, _, Backbone, selector) {

  return function (list, select) {

    var List = Backbone.View.extend({

      tagName: 'ol',
      className: 'list',
      events: { 'click .item': 'select' },

      template: _.template(selector),

      initialize: function () {
        this.$el.html(this.template({ list: list || [] }));
      },

      select: function (e) {
        var id = Number($(e.currentTarget).data('id'));
        if (typeof select === 'function') {
          select(list[id]);
        }
      }

    });

    var l = new List();

    return  l.$el;

  };
});
