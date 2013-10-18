/* jshint unused: false */

var Buckle = Buckle || {}
  , user   = user || {};

!function(Buckle, user) {

  'use strict';

  var dashboardView = new Buckle.Views.Dashboard({
    el: '.dashboard'
  , model: new Buckle.Models.User(user)
  });

}(Buckle, user);
