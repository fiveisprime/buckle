var Buckle = Buckle || {}
  , Backbone = Backbone || {}
  , _ = _ || {};

!function(Buckle, Backbone, _) {

  'use strict';

  Buckle.Views.Dashboard = Backbone.View.extend({
    events: {
      'click input[name=update]': 'update'
    }
  , initialize: function() {
      this.model.url = '/api/user/' + this.model.get('username');
      this.template = _.template($('#dashboard-template').html());
      this.render();
    }
  , render: function() {
      this.$el.html(this.template(this.model.toJSON()));
    }
  , update: function() {
      // TODO: Update the model from the inputs...
      this.model.save(null, {
        success: _.bind(this.success, this)
      , error: _.bind(this.error, this)
      });

      return false;
    }
  , success: function() {
      this.render();
    }
  , error: function(err) {
      console.log(err);
    }
  });

}(Buckle, Backbone, _);
