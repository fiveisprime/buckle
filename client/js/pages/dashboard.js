/* jshint unused: false, undef: false */

!function(Buckle, user) {

  'use strict';

  var dashboardView = new Buckle.Views.Dashboard({
    el: '.dashboard'
  , model: new Buckle.Models.User(Buckle.data.user)
  });

}(Buckle, user);
