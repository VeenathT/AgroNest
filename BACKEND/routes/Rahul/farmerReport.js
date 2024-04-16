const express = require("express");
const router = express.Router();
const FarmerReport = require("../../models/Rahul/FarmerReport");
const Reply = require("../../models/Rahul/Reply");

// Fetch dealers
router.get("/dealers", async (req, res) => {
  try {
    const dealers = await FarmerReport.find({ category: "Dealer"} );
    res.json(dealers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post("/dealers/:id/reply", async (req, res) => {
  try {
    const dealerId = req.params.id;
    const { replyText } = req.body;

    // Create a new Reply document
    const reply = new Reply({
      dealerId,
      replyText,
    });

    // Save the reply to the database
    await reply.save();

    res.status(201).json(reply);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
module.exports = router;
