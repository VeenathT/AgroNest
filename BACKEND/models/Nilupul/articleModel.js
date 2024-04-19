// BACKEND/models/Nilupul/articleModel.js
const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
  heading: { type: String, required: true },
  description: { type: String, required: true },
});

const Article = mongoose.model('Article', articleSchema);

module.exports = Article;
