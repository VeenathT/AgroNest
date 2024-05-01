const express = require('express');
const router = express.Router();
const Reply = require('../../models/Rahul/Reply');

// Get replies associated with a dealer ID
router.get("/dealers/:id/reply", async (req, res) => {
  try {
    const dealerId = req.params.id;
    // Find all replies with the given dealerId
    const replies = await Reply.find({ dealerId });
    res.json(replies);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
