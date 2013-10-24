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
        success: _.bind(this.success, this)
      , error: _.bind(this.error, this)
      });

      return false;
    }
  , success: function() {
      this.render();
      this.$el.find('.edit-message')
        .empty()
        .text('Saved!')
        .show()
        .fadeOut(2000);
    }
  , error: function() {
      console.log(arguments);
      this.$el.find('.edit-message')
        .empty()
        .text('Failed to save..')
        .show()
        .fadeOut(2000);
    }
  });

}(Buckle, Backbone, _);

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

/* jshint undef: false */

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

/* jshint undef: false */

!function(Buckle, Backbone) {

  'use strict';

  Buckle.Models.User = Backbone.Model.extend({
    defaults: {
      first: ''
    , last: ''
    }
  });

}(Buckle, Backbone);
