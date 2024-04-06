// suggestion.js

const mongoose = require("mongoose");

const suggestionSchema = new mongoose.Schema({
  fertilizerId: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

const Suggestion = mongoose.model("Suggestion", suggestionSchema);

module.exports = Suggestion;
