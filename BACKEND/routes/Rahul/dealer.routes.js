const express = require('express');
const router = express.Router();
const Dealer = require('../../models/Sudarshan/dealer_acc_mgmt/dealer'); // File path corrected

router.get('/viewdealers', async (req, res) => {
  try {
    const dealers = await Dealer.find(); // Model name remains 'Dealer'
    res.json(dealers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;


