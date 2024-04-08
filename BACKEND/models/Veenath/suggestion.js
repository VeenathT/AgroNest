// suggestion.js (models)
const mongoose = require("mongoose");

const suggestionSchema = new mongoose.Schema({
  fertilizId: {
    type: String,
    required: true,
  },
  suggest: {
    type: String,
    required: true,
  },
});

const Suggestion = mongoose.model("Suggestion", suggestionSchema);

module.exports = Suggestion;
