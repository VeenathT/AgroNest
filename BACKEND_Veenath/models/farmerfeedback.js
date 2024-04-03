// farmerfeedback.js (in modules)

const mongoose = require("mongoose");

const farmerFeedbackSchema = new mongoose.Schema({
  orderId: {
    type: String,
    required: true,
  },
  farmerName: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  starRating: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
});

const FarmerFeedback = mongoose.model("FarmerFeedback", farmerFeedbackSchema);

module.exports = FarmerFeedback;
