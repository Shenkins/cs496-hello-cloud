var mongoose = require('mongoose'),
    Schema   = mongoose.Schema;

var AuthorSchema = new Schema({
  name: { type: String, required: true, unique: true }, // Author's name
  authorURL: { type: String }, // Author's homepage
});

var ContentSchema = new Schema({
  chapterNumber: { type: Number }, // Since most web novels and comics are serialized, we need to keep track of 
  pageUrl: { type: String }, // Link to actual page
});

var TitleSchema = new Schema({
  title: { type: String, required: true, unique: true }, // Title of the Work
  mainURL: { type: String, required: true }, // The homepage of the work (would be different from Author's homepage)
  type: { type: String }, // This would be "Web Novel", "Web Comic", etc.
  language: { type: String }, // "English," "Chinese," "French," etc.
  author: [AuthorSchema], // Can be any number of authors (can also be no author if author is unknown)
  chapters: [ContentSchema], // For keeping track of chapters!
  rating: { type: Number, default: 0.0 }, // For integrating voting system
});


module.exports = mongoose.model('titles', TitleSchema);
