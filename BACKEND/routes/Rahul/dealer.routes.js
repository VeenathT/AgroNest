const express = require('express');
const router = express.Router();
const viewDealer = require('../../models/Rahul/dealer.model')

router.get('/dealers', async (req, res) => {
  try {
    const dealers = await viewDealer.find();
    res.json(dealers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
