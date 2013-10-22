var controllers = require('../controllers')()
  , users       = controllers.user;

module.exports = function(app) {

  app.get('/', function(req, res) {
    res.render('index', {
      user: req.session.user
    });
  });

  //
  // Routes.
  // ===============
  //

  require('./api')(app, controllers);
  require('./user')(app, users);
};
