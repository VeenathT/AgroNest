const express = require('express');
const router = express.Router();
const Reply = require('../../models/Rahul/Reply');


router.get("/dealers/:id/reply", async (req, res) => {
  try {
    const dealerId = req.params.id;
    
    const replies = await Reply.find({ dealerId });
    res.json(replies);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
