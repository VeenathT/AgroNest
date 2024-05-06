const express = require("express");
const router = express.Router();
const FarmerReport = require("../../models/Veenath/farmerReport");
const Reply = require("../../models/Rahul/Reply");

// Fetch dealers
router.get("/dealers", async (req, res) => {
  try {
    const dealers = await FarmerReport.find({ category: "Dealer"});
    res.json(dealers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Fetch reply 
router.get("/dealers/:id/reply", async (req, res) => {
  try {
    const dealerId = req.params.id;
    const reply = await Reply.findOne({ dealerId });
    res.json(reply);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// reply to  dealer
router.post("/dealers/:id/reply", async (req, res) => {
  try {
    const dealerId = req.params.id;
    const { replyText } = req.body;

    
    const reply = new Reply({
      dealerId,
      replyText,
    });

    // Save reply 
    await reply.save();

    res.status(201).json(reply);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update  reply
router.put('/replies/:replyId', async (req, res) => {
  try {
    const { replyId } = req.params;
    const { replyText } = req.body;

    //  update its replyText
    const updatedReply = await Reply.findByIdAndUpdate(
      replyId,
      { replyText },
      { new: true } 
    );
    res.json(updatedReply);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update dealer status
router.put('/dealers/:id/status', async (req, res) => {
  try {
    const { id } = req.params;
    const updatedDealer = await FarmerReport.findByIdAndUpdate(
      id,
      { status: 'Resolved' },
      { new: true } 
    );
    res.json(updatedDealer);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Fetch all replies 
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
