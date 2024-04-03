const mongoose = require('mongoose');

const fertilizerSuggestionSchema = new mongoose.Schema({
  fertilizerId: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
}, { timestamps: true });

const FertilizerSuggestion = mongoose.model('FertilizerSuggestion', fertilizerSuggestionSchema);

module.exports = FertilizerSuggestion;
