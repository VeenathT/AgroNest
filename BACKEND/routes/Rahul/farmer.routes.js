const express = require('express');
const router = express.Router();
const viewFarmer = require('../../models/Rahul/farmer.model');

router.get('/farmers', async (req, res) => {
  try {
    const farmers = await viewFarmer.find();
    res.json(farmers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;