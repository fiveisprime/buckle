/* jshint undef: false */

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
      this.model.set('first', this.$('[name=first]').val());
      this.model.set('last', this.$('[name=last]').val());
      this.model.set('email', this.$('[name=email]').val());

      this.model.save(null, {
        complete: _.bind(this.complete, this)
      });

      return false;
    }
  , complete: function(res, message) {
      if (message === 'success') {
        this.render();
        this.$el.find('.edit-message')
          .empty()
          .text('Saved!')
          .show()
          .fadeOut(2000);
      } else {
        this.$el.find('.edit-message')
          .empty()
          .text('Failed to save..')
          .show()
          .fadeOut(2000);
      }
    }
  });

}(Buckle, Backbone, _);
