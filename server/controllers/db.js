var mongoose = require('mongoose')
  , Schema   = mongoose.Schema
  , db;

var userSchema, User;

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
  , password: { type:String, required: true }
  });

  if (!userSchema.options.toObject) userSchema.options.toObject = {};
  userSchema.options.toObject.transform = transform;

  User = mongoose.model('User', userSchema, 'User');
});

//
// User access.
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
