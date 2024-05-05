const express = require('express');
const router = express.Router();
const Reply = require('../../models/Rahul/Reply');
const Dealer = require('../../models/Veenath/farmerReport'); 

// Create a reply
router.post('/', async (req, res) => {
  const { dealerInfo, replyText } = req.body;

  try {
    
    const dealer = await Dealer.findOne(dealerInfo);
    if (!dealer) {
      return res.status(404).json({ message: 'Dealer not found' });
    }

    // Create a new reply 
    const reply = new Reply({
      dealerId: dealer._id, 
      replyText,
    });

    
    await reply.save();

    res.status(201).json(reply);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
