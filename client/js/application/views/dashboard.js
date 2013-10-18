var Buckle = Buckle || {}
  , Backbone = Backbone || {}
  , _ = _ || {};

!function(Buckle, Backbone, _) {

  'use strict';

  Buckle.Views.Dashboard = Backbone.View.extend({
    events: {
      'click .update': 'update'
    }
  , initialize: function() {
      this.template = _.template($('#dashboard-template').html());
      this.render();
    }
  , render: function() {
      this.$el.html(this.template(this.model.toJSON()));
    }
  });

}(Buckle, Backbone, _);
