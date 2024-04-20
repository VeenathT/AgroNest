const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require("dotenv");
const app = express();
require("dotenv").config();

//rahul
const dealerRoutes = require('./routes/Rahul/dealer.routes');
const farmerRoutes =require('./routes/Rahul/farmer.routes');
const dealerReportRouter = require('./routes/Rahul/dealersReport.js');
const replyRoutess = require('./routes/Rahul/reply.js');




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

const fertilizerRouter = require('./routes/Sudarshan/inventory_mgmt/fertilizers.js');
app.use('/fertilizer', fertilizerRouter);


const dealerRouter = require('./routes/Sudarshan/dealer_acc_mgmt/dealers.js');
app.use('/dealer', dealerRouter);

//Veenath>>
const farmerFeedbackRoutes = require("./routes/Veenath/farmerfeedbacks.js");
app.use("/api/feedbacks", farmerFeedbackRoutes);

const farmerReportRoutes = require("./routes/Veenath/farmerReports.js");
app.use("/api/reports", farmerReportRoutes);

const suggestionRoutes = require("./routes/Veenath/suggestions.js");
app.use("/api/suggestions", suggestionRoutes);
//<<Veenath

const farmerRouter = require("./routes/Thisaravi/farmers.js");
app.use("/farmer", farmerRouter);


const FAnalysis = require("./routes/Kande/FAnalysis.js");
app.use("/FAnalysis",FAnalysis);

//Rahul
app.use(dealerRoutes);
app.use(farmerRoutes);
app.use('/replies', replyRoutess);
app.use("/farmerReport", dealerReportRouter);
const labsRouter = require('./routes/Rahul/labs.js');
app.use('/labs', labsRouter);


//


const labRouter = require("./routes/Oshini/lab_account/labAccounts.js");
app.use("/labAccount", labRouter);

//Lasindu
const ItemRouter = require('./routes/Lasindu/ItemR');
app.use('/item', ItemRouter);
//Lasindu

app.listen(PORT, () => {
    console.log(`Server is up and running on port number: ${PORT}`);
});