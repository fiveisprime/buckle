// TODO: remove the override:
/* jshint unused: false */

var controllers = require('../controllers')();

module.exports = function(app) {

  //
  // Route configuration.
  //

  app.get('/', function(req, res) {
    res.render('index');
  });
};
