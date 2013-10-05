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
    id: { type: String, required: true, index: true }
  , email: { type: String, required: true, index: true }
  , password: { type: String, required: true }
  , first: String
  , last: String
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
}

//
// User access.
// ============
//

exports.createUser = function(data, fn) {
  var user = new User(data);
  user.save(fn);
};

exports.getUser = function(id, fn) {
  if (id.indexOf('@') > -1) return User.findOne({ email: id }, fn);
  User.findOne({ id: id }, fn);
};

exports.getUsers = function(fn) {
  User.find(fn);
};
