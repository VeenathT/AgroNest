const express = require("express");
const router = express.Router();
const FarmerReport = require("../../models/Veenath/farmerReport"); // Assuming the FarmerReport model path is correct
const Reply = require("../../models/Rahul/ReplyFarmer");

// Fetch farmers
router.get("/farmers", async (req, res) => {
  try {
    const farmers = await FarmerReport.find({ category: "Farmer" });
    res.json(farmers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Fetch reply associated with a farmer
router.get("/farmers/:id/reply", async (req, res) => {
  try {
    const farmerId = req.params.id;
    const reply = await Reply.findOne({ farmerId });
    res.json(reply);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post("/farmers/:id/reply", async (req, res) => {
  try {
    const farmerId = req.params.id;
    const { replyText } = req.body;

    // Create a new Reply document
    const reply = new Reply({
      farmerId,
      replyText,
    });

    // Save the reply to the database
    await reply.save();

    res.status(201).json(reply);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update status of a farmer
// Modify this route according to your requirements

router.put('/farmers/:id/status', async (req, res) => {
  try {
    const { id } = req.params;
    const updatedFarmer = await FarmerReport.findByIdAndUpdate(
      id,
      { status: 'Resolved' },
      { new: true } // To return the updated farmer object
    );
    res.json(updatedFarmer);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/replies/:farmerId', async (req, res) => {
  try {
    const { farmerId } = req.params;
    const replies = await Reply.find({ farmerId });
    res.json(replies);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

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
