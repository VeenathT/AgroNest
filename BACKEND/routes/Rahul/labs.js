const express = require('express');
const router = express.Router();
const Lab = require('../../models/Oshini/LabAccount');

// Get a list of labs (show only name)
router.get('/', async (req, res) => {
  try {
    const labs = await Lab.find({}, { }); 
    res.json(labs);
  } catch (err) {
    res.status(500).json({ message: err.message }); 
  }
});

module.exports = router;
