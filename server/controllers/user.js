var bcrypt = require('bcrypt');

var sanitize = function(user) {
  delete user.password;
  return user;
};

//
// User constructor function for working with users. Handles validation and
//    persistence of user information.
//
var User = function(db) {
  this.db = db;

  //
  // Fall back to default rounds/length for local development.
  //
  this.salt = bcrypt.genSaltSync(
    +process.env.SALT_ROUNDS || 10
  , +process.env.SEED_LENGTH || 20);
};

//
// Authenticate the user with the specified ID against the specified password.
//
User.prototype.authenticate = function(id, password, fn) {
  this.db.getUser(id, function(err, user) {
    if (err) return fn(err, null);
    if (!user) return fn(new Error('User account not found.'), null);

    user = user.toObject();

    bcrypt.compare(password, user.password, function(err, res) {
      if (err) return fn(err, null);
      if (res) {
        fn(null, sanitize(user));
      } else {
        fn(new Error('Invalid user credentials.'), null);
      }
    });
  });
};

//
// Get the public profile for the use with the specified id.
//
User.prototype.getPublicProfile = function(id, fn) {
  this.db.getUser(id, function(err, user) {
    if (user) return fn(null, sanitize(user.toObject()));
    fn(err, null);
  });
};

//
// Creates a new user from the data posted in from the registration form.
//
User.prototype.create = function(data, fn) {
  var _this = this;

  data.password = bcrypt.hashSync(data.password, this.salt);
  this.db.createUser(data, function(err, docs) {
    if (err) return fn(err, null);

    fn(null, _this.db.flatten(docs));
  });
};

module.exports = function(db) {
  return new User(db);
};
