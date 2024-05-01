const express = require("express");
const router = express.Router();
const FarmerReport = require("../../models/Veenath/farmerReport");
const Reply = require("../../models/Rahul/Reply");

// Fetch farmers
router.get("/dealers", async (req, res) => {
  try {
    const dealers = await FarmerReport.find({ category: "Dealer"});
    res.json(dealers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Fetch reply associated with a dealer
router.get("/dealers/:id/reply", async (req, res) => {
  try {
    const dealerId = req.params.id;
    const reply = await Reply.findOne({ dealerId });
    res.json(reply);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Send reply to a dealer
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

// Update an existing reply
router.put('/replies/:replyId', async (req, res) => {
  try {
    const { replyId } = req.params;
    const { replyText } = req.body;

    // Find the reply by id and update its replyText
    const updatedReply = await Reply.findByIdAndUpdate(
      replyId,
      { replyText },
      { new: true } // To return the updated reply object
    );
    res.json(updatedReply);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update status of a dealer
router.put('/dealers/:id/status', async (req, res) => {
  try {
    const { id } = req.params;
    const updatedDealer = await FarmerReport.findByIdAndUpdate(
      id,
      { status: 'Resolved' },
      { new: true } // To return the updated dealer object
    );
    res.json(updatedDealer);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Fetch all replies associated with a dealer
router.get('/replies/:dealerId', async (req, res) => {
  try {
    const { dealerId } = req.params;
    const replies = await Reply.find({ dealerId });
    res.json(replies);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete a reply
router.delete('/replies/:replyId', async (req, res) => {
  try {
    const { replyId } = req.params;
    await Reply.findByIdAndDelete(replyId);
    res.json({ message: 'Reply deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
