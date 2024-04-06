const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require("dotenv");
const app = express();
require("dotenv").config();

const PORT = process.env.PORT || 8070;

app.use(cors());
app.use(bodyParser.json());

const URL = process.env.MONGODB_URL;

mongoose.connect(URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("MongoDB connection success!");
}).catch((error) => {
    console.log("MongoDB connection error:", error);
});

const fertilizerRouter = require('./routes/inventory_mgmt/fertilizers.js');
app.use('/fertilizer', fertilizerRouter);

// Import farmer feedback and report routes
const farmerFeedbackRoutes = require("./routes/Veenath/farmerfeedbacks.js");
const farmerReportRoutes = require("./routes/Veenath/farmerReports.js");
// Import suggestion routes
const suggestionRoutes = require("./routes/Veenath/suggestions.js");

// Use farmer feedback and report routes
app.use("/api/feedbacks", farmerFeedbackRoutes);
app.use("/api/reports", farmerReportRoutes);
// Use suggestion routes
app.use("/api/suggestions", suggestionRoutes);

app.listen(PORT, () => {
    console.log(`Server is up and running on port number: ${PORT}`);
});