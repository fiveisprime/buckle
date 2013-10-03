module.exports = function(app) {

  //
  // Configure the routes.
  //

  app.get('/', function(req, res) {
    res.render('index');
  });
};
