var mongoose = require('mongoose'),
    Schema   = mongoose.Schema;

var UserSchema = new Schema({
  name: { type: String },
  email: { type: String },
  password: { type: String },
  gender: { type: String },
  admin: { type: String }
});

module.exports = mongoose.model('records', UserSchema);
