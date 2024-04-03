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
connection.once("open",() => {
    console.log("MongoDB Connection Success!");
});

// Import farmer feedback routes
const farmerFeedbackRoutes = require("./routes/farmerfeedbacks");
// Import farmer report routes
const farmerReportRoutes = require("./routes/farmerReports");
// Import fertilizer suggestion routes
const fertilizerSuggestionRoutes = require("./routes/fertilizerSuggestions");

// Use farmer feedback routes
app.use("/api/feedbacks", farmerFeedbackRoutes);
// Use farmer report routes
app.use("/api/reports", farmerReportRoutes);
// Use fertilizer suggestion routes
app.use("/api/suggestions", fertilizerSuggestionRoutes);

app.listen(PORT, () =>{
    console.log(`Server is up and running on port number: ${PORT}`);
});
