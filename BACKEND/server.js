const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require("dotenv");
const app = express();
require("dotenv").config();
//new--------------------------------
const session = require('express-session');
const MongoStore = require('connect-mongo');
const crypto = require('crypto');
const cron = require('node-cron');
const moment = require('moment');
const Lab = require('./models/Oshini/lab_account/labAccount.js');

// Generate a random secret key
const secretKey = crypto.randomBytes(32).toString('hex');

console.log('Generated secret key:', secretKey);

// Set up session middleware
app.use(session({
  secret: secretKey, // Change this to your own secret key
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({ mongoUrl: 'mongodb+srv://sudarshan16811:16811@cluster0.tww6ryy.mongodb.net/AgroNest' }), // Adjust the MongoDB URL as needed
}));
//end---------------------------------

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

//Oshini
const labRouter = require("./routes/Oshini/lab_account/labAccounts.js");
app.use("/labAccount", labRouter);

//------------------------------------------------------------------------------------------------------------------
// Cron job to add time slots for the next day
cron.schedule('0 0 * * *', async () => {
    try {
      // Get the current date
      const currentDate = moment().startOf('day');
  
      // Calculate the date 3 days ahead
      const targetDate = currentDate.clone().add(3, 'days').toDate();
  
      // Fetch all existing labs from the database
      const labs = await Lab.find({}, '_id'); // Only fetch the _id field
      const addTimeSlots = require('./routes/Oshini/lab_account/labSlots');
      // Iterate over each lab and add time slots for the target date
      for (const lab of labs) {
        await addTimeSlots(targetDate, lab._id);
      }
  
      console.log('Time slots added for all existing labs for the target date');
    } catch (error) {
      console.error('Error adding time slots:', error);
    }
  });
  
  //---------------------------------------------------------------------------------------------
  // Cron job to delete expired time slots every hour
  cron.schedule('0 * * * *', async () => {
    try {
      // Get the current date and time
      const currentDateTime = moment();
  
      // Find and delete expired time slots from the database
      await LabSlot.deleteMany({ 'timeSlots.endTime': { $lt: currentDateTime.toDate() } });
  
      console.log('Expired time slots deleted');
    } catch (error) {
      console.error('Error deleting expired time slots:', error);
    }
  });
  //--------------------------------------------------------------------------------------------------------------------------
  

app.listen(PORT, () => {
    console.log(`Server is up and running on port number: ${PORT}`);
});