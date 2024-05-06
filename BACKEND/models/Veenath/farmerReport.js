const mongoose = require("mongoose");

const farmerReportSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  topic: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  priority: {
    type: String,
    enum: ["Low", "Medium", "High"],
    required: true,
  },
  category: {
    type: String,
    enum: ["Farmer", "Dealer"],
    required: true,
  },
  area: {
    type: String,
    enum: [
      "Kandy",
      "Colombo",
      "Galle",
      "Jaffna",
      "Kurunegala",
      "Anuradhapura",
      "Gampaha",
      "Matara",
      "Hambantota",
      "Badulla",
      "Ratnapura",
      "Ampara",
      "Monaragala",
      "Polonnaruwa",
      "Puttalam",
      "Kegalle",
      "Matale",
      "Nuwara Eliya",
      "AreaTrincomalee",
      "Batticaloa",
      "Mannar",
      "Vavuniya",
      "Kilinochchi",
      "Mullaitivu",
    ],
    required: true,
  },
  status: {
    type: String,
    enum: ["Pending","Resolved"],
    default: "Pending",
  },
  replyText: {
    type: String,
  },
});

const FarmerReport = mongoose.model("FarmerReport", farmerReportSchema);

module.exports = FarmerReport;
