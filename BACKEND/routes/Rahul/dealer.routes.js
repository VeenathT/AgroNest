const express = require('express');
const router = express.Router();
const Dealer = require('../../models/Sudarshan/dealer_acc_mgmt/dealer'); // File path corrected

// Get all dealers
router.get('/viewdealers', async (req, res) => {
  try {
    const dealers = await Dealer.find(); // Model name remains 'Dealer'
    res.json(dealers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// delete ID
router.delete('/viewdealers/delete/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deletedDealer = await Dealer.findByIdAndDelete(id);
    if (!deletedDealer) {
      return res.status(404).json({ message: 'Dealer not found' });
    }
    res.json({ message: 'Dealer deleted successfully' });
  } catch (error) {
    console.error('Error deleting dealer:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});
module.exports = router;
