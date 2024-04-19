const router = require('express').Router();
const LabSlot = require('../../../models/Oshini/lab_account/labSlot');

// Route to add time slots manually
router.post('/addTimeSlots', async (req, res) => {
  try {
    const { labId, date, timeSlots } = req.body;

    // Create a new LabSlot document to save to the database
    const labSlot = new LabSlot({
      labId: labId,
      date: date,
      timeSlots: timeSlots
    });

    // Save the LabSlot document to the database
    await labSlot.save();

    res.status(201).json({ message: 'Time slots added successfully' });
  } catch (error) {
    console.error('Error adding time slots:', error);
    res.status(500).json({ message: 'Failed to add time slots. Please try again later.' });
  }
});





// Route to delete a specific time slot
router.delete('/deleteTimeSlot/:labId/:date/:startTime', async (req, res) => {
    try {
      const { labId, date, startTime } = req.params;
  
      // Find the LabSlot document by labId and date
      const labSlot = await LabSlot.findOne({ labId: labId, date: date });
  
      if (!labSlot) {
        return res.status(404).json({ message: 'Lab slot not found' });
      }
  
      // Find the index of the time slot with the given start time
      const index = labSlot.timeSlots.findIndex(slot => slot.startTime === startTime);
  
      if (index === -1) {
        return res.status(404).json({ message: 'Time slot not found' });
      }
  
      // Remove the time slot from the array
      labSlot.timeSlots.splice(index, 1);
  
      // Save the updated LabSlot document
      await labSlot.save();
  
      res.status(200).json({ message: 'Time slot deleted successfully' });
    } catch (error) {
      console.error('Error deleting time slot:', error);
      res.status(500).json({ message: 'Failed to delete time slot. Please try again later.' });
    }
  });
  
  module.exports = router;