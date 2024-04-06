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

const farmerFeedbackRoutes = require("./routes/Veenath/farmerfeedbacks.js");
app.use("/api/feedbacks", farmerFeedbackRoutes);
const farmerReportRoutes = require("./routes/Veenath/farmerReports.js");
app.use("/api/reports", farmerReportRoutes);
const suggestionRoutes = require("./routes/Veenath/suggestions.js");
app.use("/api/suggestions", suggestionRoutes);


app.listen(PORT, () => {
    console.log(`Server is up and running on port number: ${PORT}`);
});