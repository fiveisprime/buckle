//
// Initialize each of the controllers.
//
var Controller = function(db) {
  this.user = require('./user')(db);
};

module.exports = function() {
  return new Controller(require('./db'));
};
