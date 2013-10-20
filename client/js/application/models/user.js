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
