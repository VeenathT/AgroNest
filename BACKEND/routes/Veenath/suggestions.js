// suggestions.js

const router = require("express").Router();
const Suggestion = require("../../models/Veenath/suggestion");

// Create a new suggestion
router.post("/", async (req, res) => {
  try {
    const { fertilizerId, description } = req.body;
    const newSuggestion = new Suggestion({
      fertilizerId,
      description,
    });
    const savedSuggestion = await newSuggestion.save();
    res.status(201).json(savedSuggestion);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// Get all suggestions
router.get("/", async (req, res) => {
  try {
    const suggestions = await Suggestion.find();
    res.json(suggestions);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// Get suggestion by ID
router.get("/:id", async (req, res) => {
  try {
    const suggestion = await Suggestion.findById(req.params.id);
    if (!suggestion) {
      return res.status(404).json({ error: "Suggestion not found" });
    }
    res.json(suggestion);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// Update suggestion by ID
router.put("/:id", async (req, res) => {
  try {
    const { fertilizerId, description } = req.body;
    const updatedSuggestion = await Suggestion.findByIdAndUpdate(
      req.params.id,
      { fertilizerId, description },
      { new: true }
    );
    if (!updatedSuggestion) {
      return res.status(404).json({ error: "Suggestion not found" });
    }
    res.json(updatedSuggestion);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// Delete suggestion by ID
router.delete("/:id", async (req, res) => {
  try {
    const deletedSuggestion = await Suggestion.findByIdAndDelete(req.params.id);
    if (!deletedSuggestion) {
      return res.status(404).json({ error: "Suggestion not found" });
    }
    res.json({ message: "Suggestion deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
