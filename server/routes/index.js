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

  app.get('/register', function(req, res) {
    res.render('user/register');
  });

  app.post('/register', function(req, res) {
    res.render('error', { error: 'Not yet...' });
  });
};
