const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const app = express();
require("dotenv").config();

const PORT = process.env.PORT || 8070;

app.use(cors());
app.use(bodyParser.json());

const URL = process.env.MONGODB_URL;

mongoose.connect(URL,{
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
});

const connection = mongoose.connection;
connection.once("open", () => {
    console.log("Mongodb Connection Success!");
});

// Import farmer feedback and report routes
const farmerFeedbackRoutes = require("./routes/farmerfeedbacks");
const farmerReportRoutes = require("./routes/farmerReports");
const suggestionRoutes = require("./routes/suggestions");

// Use farmer feedback and report routes
app.use("/api/feedbacks", farmerFeedbackRoutes);
app.use("/api/reports", farmerReportRoutes);
// Use suggestion routes
app.use("/api/suggestions", suggestionRoutes);

app.listen(PORT, () => {
    console.log(`Server is up and running on port number: ${PORT}`);
});
