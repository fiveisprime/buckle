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

      res.render('user/profile', { profile: user });
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
        delete req.body.password;

        var errors = [];
        if (err.errors) {
          var keys = Object.keys(err.errors);
          for (var i = 0; i < keys.length; i++) {
            errors.push(err.errors[keys[i]]);
          }
        } else {
          errors.push(err.message);
        }

        return res.render('user/register', {
          errors: errors
        , data: req.body
        });
      }

      req.session.user = user;
      res.redirect('/');
    });
  });

  app.get('/login', function(req, res) {
    res.render('user/login');
  });

  app.post('/login', function(req, res) {
    users.authenticate(req.body.id, req.body.password, function(err, user) {
      if (err) {
        console.error(err);
        return res.render('user/login', {
          error: err.message
        , id: req.body.id
        });
      }

      req.session.user = user;
      res.redirect('/dashboard');
    });
  });

  app.get('/logout', function(req, res) {
    req.session.user = null;
    res.redirect('/');
  });

  //
  // Routes.
  // ===============
  //

  require('./api')(app, controllers);
};
