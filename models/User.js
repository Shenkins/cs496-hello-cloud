var mongoose = require('mongoose'),
    Schema   = mongoose.Schema;

var UserSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, required: true, unique: true },
  password: { type: String,required: true },
  gender: { type: String },
  admin: { type: String }
});

module.exports = mongoose.model('users', UserSchema);
