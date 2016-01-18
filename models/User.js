var mongoose = require('mongoose'),
    Schema   = mongoose.Schema;

var UserSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  role: { type: String, required: true },
  admin: Boolean,
  location: String
});

module.exports = mongoose.model('User', UserSchema);
