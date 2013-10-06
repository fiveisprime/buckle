var mongoose = require('mongoose')
  , Schema   = mongoose.Schema
  , db;

var userSchema, User;

var linksSchema;

//
// Removes Object ID and Version objects from a model.
//
var transform = function(doc, ret) {
  delete ret._id;
  delete ret.__v;
};

// Use a local test database for local development.
mongoose.connect(process.env.MONGO_URL || 'mongodb://localhost/test');

db = mongoose.connection;

db.on('error', console.error);
db.once('open', function initializeMongoose() {
  userSchema = new Schema({
    username: { type: String, required: true, index: true }
  , email: { type: String, required: true, index: true }
  , password: { type: String, required: true }
  , first: String
  , last: String
  , bio: String
  , image: String
  , links: [linksSchema]
  });

  linksSchema = new Schema({
    name: String
  , icon: String
  , url: String
  });

  if (!userSchema.options.toObject) userSchema.options.toObject = {};
  if (!linksSchema.options.toObject) linksSchema.options.toObject = {};

  userSchema.options.toObject.transform = transform;
  linksSchema.options.toObject.transform = transform;

  User = mongoose.model('User', userSchema, 'User');
});

//
// Utilities.
// ==========
//

exports.flatten = function(docs) {
  if (!docs) return null;

  if (docs instanceof Array) {
    return docs.map(function(doc) {
      return doc.toObject();
    });
  } else {
    return docs.toObject();
  }
};

//
// User access.
// ============
//

//
// Create a new user from the specified user data.
//
exports.createUser = function(data, fn) {
  var user = new User(data);
  user.save(fn);
};

//
// Get a user by ID where ID is either the user's username or email address.
//
exports.getUser = function(id, fn) {
  if (id.indexOf('@') > -1) return User.findOne({ email: id }, fn);
  User.findOne({ username: id }, fn);
};

//
// Get all users.
//
exports.getUsers = function(fn) {
  User.find(fn);
};

//
// Update the specified user object.
//
exports.updateUser = function(data, fn) {
  User.findOne({ username: data.username }, function(err, user) {
    if (err) return fn(err, null);
    var keys = Object.keys(user), i = 0;

    for (; i < keys.length; i++) {
      user[keys[i]] = data[keys[i]] || user[keys[i]];
    }

    user.save(fn);
  });
};
