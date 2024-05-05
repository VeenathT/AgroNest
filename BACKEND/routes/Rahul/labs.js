const express = require('express');
const router = express.Router();
const Lab = require('../../models/Oshini/lab_account/labAccount');

// Get lab list 
router.get('/', async (req, res) => {
  try {
    const labs = await Lab.find({}, { }); 
    res.json(labs);
  } catch (err) {
    res.status(500).json({ message: err.message }); 
  }
});

module.exports = router;
