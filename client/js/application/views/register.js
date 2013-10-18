var Buckle   = Buckle || {}
  , Backbone = Backbone || {};

!function(Buckle, Backbone) {

  'use strict';

  Buckle.Views.Register = Backbone.View.extend({
    events: {
      'click button[type=submit]': 'submit'
    }
  , initialize: function() {
      this.$username = this.$el.find('[name=username]');
      this.$password = this.$el.find('[name=password]');
      this.$email    = this.$el.find('[name=email]');
      this.$err      = this.$el.find('.error-message');
      this.pattern   = /\S+@\S+\.\S+/;
    }
  , submit: function() {
      if (this.$username.val().length === 0) {
        this.$err.empty().text('You must choose a username.');
        return false;
      }

      if (this.$email.val().length === 0) {
        this.$err.empty().text('You must enter an email address.');
        return false;
      }

      if (!this.pattern.test(this.$email.val())) {
        this.$err.empty().text('Your email address must be valid.');
        return false;
      }

      if (this.$password.val().length === 0) {
        this.$err.empty().text('You must enter password.');
        return false;
      }

      this.$err.empty();
    }
  });

}(Buckle, Backbone);
