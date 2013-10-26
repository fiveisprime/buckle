var phalanx = require('phalanx');

module.exports = function(app, controllers) {

  app.post('/api/user/:username', function(req, res) {
    controllers.user.update(req.body, function(err, result) {
      if (err) return phalanx.internalServerError(err).json(res);
      if (result.err) return phalanx.badRequest('Failed to save user.').json(res);

      res.json({ result: true });
    });
  });

};
