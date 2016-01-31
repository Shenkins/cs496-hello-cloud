var mongoose = require('mongoose'),
    Schema   = mongoose.Schema;

var AuthorSchema = new Schema({
  name: { type: String, required: true, unique: true },
  email: { type: String, required: true, required: true, unique: true },
  url: { type: String,required: true },
  type: { type: String },
  work: [String],
  admin: { type: String }
});

module.exports = mongoose.model('authors', AuthorSchema);
