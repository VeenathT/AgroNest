// farmerfeedbacks.js (in routes)

const router = require("express").Router();
const FarmerFeedback = require("../models/farmerfeedback");

// Create farmer feedback
router.post("/", async (req, res) => {
  try {
    const { orderId, farmerName, description, starRating } = req.body;
    const newFeedback = new FarmerFeedback({
      orderId,
      farmerName,
      description,
      starRating,
    });
    const savedFeedback = await newFeedback.save();
    res.status(201).json(savedFeedback);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// Get all farmer feedbacks with average rating
router.get("/", async (req, res) => {
  try {
    const feedbacks = await FarmerFeedback.find();
    let totalRatings = 0;
    feedbacks.forEach((feedback) => {
      totalRatings += feedback.starRating;
    });
    const averageRating = feedbacks.length > 0 ? totalRatings / feedbacks.length : 0;
    res.json({ feedbacks, averageRating });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// Get farmer feedback by ID
router.get("/:id", async (req, res) => {
  try {
    const feedback = await FarmerFeedback.findById(req.params.id);
    if (!feedback) {
      return res.status(404).json({ error: "Feedback not found" });
    }
    res.json(feedback);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// Update farmer feedback by ID
router.put("/:id", async (req, res) => {
  try {
    const { orderId, farmerName, description, starRating } = req.body;
    const updatedFeedback = await FarmerFeedback.findByIdAndUpdate(
      req.params.id,
      { orderId, farmerName, description, starRating },
      { new: true }
    );
    if (!updatedFeedback) {
      return res.status(404).json({ error: "Feedback not found" });
    }
    res.json(updatedFeedback);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// Delete farmer feedback by ID
router.delete("/:id", async (req, res) => {
  try {
    const deletedFeedback = await FarmerFeedback.findByIdAndDelete(
      req.params.id
    );
    if (!deletedFeedback) {
      return res.status(404).json({ error: "Feedback not found" });
    }
    res.json({ message: "Feedback deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
