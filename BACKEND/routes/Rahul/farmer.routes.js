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

module.exports = router;