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
const LabSlot = require('./models/Oshini/lab_account/labSlot');
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
const fs = require('fs');


//Nilupul
const articleRoutes = require('./routes/Nilupul/articleRoutes.js');


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
app.use("/Farmer", farmerRouter);

const soilTestRouter = require("./routes/Thisaravi/soilTests.js");
app.use("/SoilTest", soilTestRouter);

const FAnalysis = require("./routes/Kande/FAnalysis.js");
app.use("/FAnalysis",FAnalysis);

//Oshini
const labRouter = require("./routes/Oshini/lab_account/labAccounts.js");
app.use("/labAccount", labRouter);

//Lasindu
const ItemRouter = require('./routes/Lasindu/ItemR');
app.use('/item', ItemRouter);

const OrderRouter = require('./routes/Lasindu/OrderR');
app.use('/order', OrderRouter);
//Lasindu

const labSlotRouter = require("./routes/Oshini/lab_account/labSlots.js");
app.use("/labSlot", labSlotRouter);

const testRequestRouter = require("./routes/Oshini/test_request/testRequests.js");
app.use("/testRequest", testRequestRouter);

//Rahul
const dealerRoutes = require('./routes/Rahul/dealer.routes');
app.use(dealerRoutes);

const farmerRoutes =require('./routes/Rahul/farmer.routes');
app.use(farmerRoutes);

const labsRouter = require('./routes/Rahul/labs.js');
app.use('/labs', labsRouter);

const dealerReportRouter = require('./routes/Rahul/dealersReport.js');
app.use("/farmerReport", dealerReportRouter);

const replyRoutess = require('./routes/Rahul/reply.js');
app.use('/replies', replyRoutess);

const farmerReport = require('./routes/Rahul/farmerReport.js')
app.use("/farmerReport",farmerReport)



//------------------------------------------------------------------------------------------------------------------

cron.schedule('0 0 * * *', async () => {
    try {
      const currentDate = moment().startOf('day');
 
      const targetDate = currentDate.clone().add(3, 'days').toDate();

      const labs = await Lab.find({}, '_id'); 
      const addTimeSlots = require('./routes/Oshini/lab_account/labSlotsUtility.js');

      for (const lab of labs) {
        await addTimeSlots(targetDate, lab._id);
      }
  
      console.log('Time slots added for all existing labs for the target date');
    } catch (error) {
      console.error('Error adding time slots:', error);
    }
  });
  
  //---------------------------------------------------------------------------------------------
  cron.schedule('0 * * * *', async () => {
    try {
      const currentDateTime = moment();
    
      await LabSlot.updateMany(
        { timeSlots: { $elemMatch: { endTime: { $lt: currentDateTime.toDate() } } } }, 
        { $pull: { timeSlots: { endTime: { $lt: currentDateTime.toDate() } } } } 
      );
    
      console.log('Expired time slots deleted');
    } catch (error) {
      console.error('Error deleting expired time slots:', error);
    }
  });
  
  
  //--------------------------------------------------------------------------------------------------------------------------
  

// const articlerouter = require("./routes/Nilupul/articleRoutes.js")
// app.use("/articleModel.js", articlerouter);

app.use('/api/articles', articleRoutes);



app.listen(PORT, () => {
    console.log(`Server is up and running on port number: ${PORT}`);
});