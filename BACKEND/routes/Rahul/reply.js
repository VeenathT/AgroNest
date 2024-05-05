const express = require('express');
const router = express.Router();
const Reply = require('../../models/Rahul/Reply');
const Dealer = require('../../models/Veenath/farmerReport'); // Assuming you have a Dealer model

// Create a reply
router.post('/', async (req, res) => {
  const { dealerInfo, replyText } = req.body;

  try {
    // Find the dealer based on the provided dealer information
    const dealer = await Dealer.findOne(dealerInfo);
    if (!dealer) {
      return res.status(404).json({ message: 'Dealer not found' });
    }

    // Create a new reply document
    const reply = new Reply({
      dealerId: dealer._id, // Assign the dealer's ID to the reply
      replyText,
    });

    // Save the reply to the database
    await reply.save();

    res.status(201).json(reply);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
