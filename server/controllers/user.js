var bcrypt = require('bcrypt');

var User = function(db) {
  this.db = db;

  //
  // Fall back to default rounds/length for local development.
  //
  this.salt = bcrypt.genSaltSync(
    process.env.SALT_ROUNDS || 10
  , process.env.SEED_LENGTH || 20);
};

User.prototype.authenticate = function(id, password, fn) {
  this.get.db.getUser(id, function(err, user) {
    if (err) return fn(err, null);

    bcrypt.compare(password, user.password, function(err, res) {
      if (err) return fn(err, null);
      if (res) {
        fn(null, user);
      } else {
        fn(new Error('Invalid user credentials.'), null);
      }
    });
  });
};

User.prototype.create = function(data, fn) {
  data.password = bcrypt.hashSync(data.password, this.salt);
  this.db.createUser(data, fn);
};

module.exports = function(db) {
  return new User(db);
};