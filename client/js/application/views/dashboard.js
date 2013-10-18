var Buckle = Buckle || {}
  , Backbone = Backbone || {}
  , _ = _ || {};

!function(Buckle, Backbone, _) {

  'use strict';

  Buckle.Views.Dashboard = Backbone.View.extend({
    events: {}
  , initialize: function() {
      this.template = _.template(this.$('#dashboard-template'));
    }
  });

}(Buckle, Backbone, _);
