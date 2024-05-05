const express = require('express');
const router = express.Router();
const Farmer = require('../../models/Thisaravi/Farmer');

router.get('/viewfarmers', async (req, res) => {
  try {
    const farmers = await Farmer.find();
    res.json(farmers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// delete delaer
router.delete('/viewfarmers/delete/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deletedFarmer = await Farmer.findByIdAndDelete(id); 
    if (!deletedFarmer) {
      return res.status(404).json({ message: 'Farmer not found' });
    }
    res.json({ message: 'Farmer deleted successfully' });
  } catch (error) {
    console.error('Error deleting farmer:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


module.exports = router;