// farmerReport.js (in modules)

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
      "Area 1",
      "Area 2",
      "Area 3",
      "Area 4",
      "Area 5",
      "Area 6",
      "Area 7",
      "Area 8",
      "Area 9",
      "Area 10",
      "Area 11",
      "Area 12",
      "Area 13",
      "Area 14",
      "Area 15",
      "Area 16",
      "Area 17",
      "Area 18",
      "Area 19",
      "Area 20",
      "Area 21",
      "Area 22",
      "Area 23",
      "Area 24",
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
