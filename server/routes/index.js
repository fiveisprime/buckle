var controllers = require('../controllers')()
  , users       = controllers.user;

module.exports = function(app) {

  app.get('/', function(req, res) {
    res.render('index', {
      user: req.session.user
    });
  });

  app.get('/dashboard', function(req, res) {
    if (req.session.user) {
      res.render('user/dashboard', { user: req.session.user });
    } else {
      res.redirect('/login');
    }
  });

  app.get('/users/:id', function(req, res) {
    users.getPublicProfile(req.params.id, function(err, user) {
      if (err) {
        console.error(err);
        return res.render('error', { error: err.message });
      }
      if (!user) return res.render('error', { error: 'User not found.' });

      res.render('user/profile', { user: user });
    });
  });

  //
  // Authentication.
  // ===============
  //

  app.get('/register', function(req, res) {
    res.render('user/register');
  });

  app.post('/register', function(req, res) {
    users.create(req.body, function(err, user) {
      if (err) {
        console.error(err);
        return res.render('error', { error: err.message });
      }

      req.session.user = user;
      res.render('index', { user: req.session.user });
    });
  });

  app.get('/login', function(req, res) {
    res.render('user/login');
  });

  app.post('/login', function(req, res) {
    users.authenticate(req.body.id, req.body.password, function(err, user) {
      if (err) {
        console.error(err);
        return res.render('error', { error: 'Unable to authenticate.' });
      }

      req.session.user = user;
      res.redirect('/dashboard');
    });
  });
};
