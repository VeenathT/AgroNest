const mongoose = require("mongoose");

const farmerReportSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  orderId: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  priority: {
    type: String,
    enum: ["low", "medium", "high"],
    default: "medium",
  },
  category: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "open", "resolved"],
    default: "pending",
  },
  farmerId: {
    type: String,
    required: true,
  },
  area: {
    type: String,
    required: true,
  },
});

const FarmerReport = mongoose.model("FarmerReport", farmerReportSchema);

module.exports = FarmerReport;
