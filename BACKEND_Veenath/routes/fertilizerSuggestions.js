const router = require('express').Router();
const FertilizerSuggestion = require('../models/fertilizerSuggestion');

// Create a fertilizer suggestion
router.post('/', async (req, res) => {
  try {
    const { fertilizerId, description } = req.body;
    const newSuggestion = new FertilizerSuggestion({ fertilizerId, description });
    const savedSuggestion = await newSuggestion.save();
    res.status(201).json(savedSuggestion);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get all fertilizer suggestions
router.get('/', async (req, res) => {
  try {
    const suggestions = await FertilizerSuggestion.find();
    res.json(suggestions);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
