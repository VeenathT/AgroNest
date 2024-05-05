// farmerReportRoutes.js

const express = require('express');
const FarmerReport = require('../../models/Veenath/farmerReport'); // Assuming you have a FarmerReport model defined

const router = express.Router();

// Route to count farmer reports with status "Pending"
router.get('/countPendingFarmerReports', async (req, res) => {
  try {
    const count = await FarmerReport.countDocuments({ status: 'Pending' });
    res.json({ count });
  } catch (error) {
    console.error("Error counting pending farmer reports:", error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
