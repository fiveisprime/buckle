// TODO: remove the override:
/* jshint unused: false */

var controllers = require('../controllers')()
  , users       = controllers.user;

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

  app.get('/login', function(req, res) {
    res.render('user/login');
  });

  app.post('/login', function(req, res) {
    users.authenticate(req.body.id, req.body.password, function(err, user) {
      if (err) return res.render('error', { error: 'Unable to authenticate.' });

      req.session.user = user;
      res.render('index', {
        user: req.session.user
      });
    });
  });
};
