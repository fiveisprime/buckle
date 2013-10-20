/* jshint undef: false */

!function(Buckle, Backbone) {

  'use strict';

  Buckle.Views.Login = Backbone.View.extend({
    events: {
      'click button[type=submit]': 'submit'
    }
  , initialize: function() {
      this.$id       = this.$el.find('[name=id]');
      this.$password = this.$el.find('[name=password]');
      this.$err      = this.$el.find('.error-message');

      this.$id.focus();
    }
  , submit: function() {
      if (this.$id.val().length === 0) {
        this.$err.empty().text('Enter your username.');
        return false;
      }

      if (this.$password.val().length === 0) {
        this.$err.empty().text('Enter your password.');
        return false;
      }

      this.$err.empty();
    }
  });

}(Buckle, Backbone);
