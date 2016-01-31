var mongoose = require('mongoose'),
    Schema   = mongoose.Schema;

var ContentSchema = new Schema({
  title: { type: String, required: true, unique: true },
  email: { type: String, required: true, required: true, unique: true },
  url: { type: String,required: true },
  type: { type: String },
  author: { Object: { name: }}
  admin: { type: String }
});

module.exports = mongoose.model('contents', ContentSchema);
