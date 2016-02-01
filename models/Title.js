var mongoose = require('mongoose'),
    Schema   = mongoose.Schema;

var TitleSchema = new Schema({
  title: { type: String, required: true, unique: true }, // Title of the Work
  mainURL: { type: String, required: true }, // The homepage of the work (would be different from Author's homepage)
  type: { type: String }, // This would be "Web Novel", "Web Comic", etc.
  language: { type: String }, // "English," "Chinese," "French," etc.
  author: [{
    name: {type: String, required: true, unique: true}, 
    authorURL : { type: String } }],
  chapters: [{
    chapterNumber: { type : Number }, 
    pageURL : { type: String } 
  }],
  rating: { type: Number, default: 0.0 }, // For integrating voting system
});


module.exports = mongoose.model('titles', TitleSchema);
