const mongoose = require("mongoose");

const farmerFeedbackSchema = new mongoose.Schema({
  orderId: {
    type: String,
    required: false,
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
  itemcode: {
    type: Number, 
    required: true,
  },
});

const FarmerFeedback = mongoose.model("FarmerFeedback", farmerFeedbackSchema);

module.exports = FarmerFeedback;
