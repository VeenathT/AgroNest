const router = require('express').Router();
const LabSlot = require('../../../models/Oshini/lab_account/labSlot');


router.post('/addTimeSlots', async (req, res) => {
  try {
    const { labId, date, timeSlots } = req.body;

   
    const labSlot = new LabSlot({
      labId: labId,
      date: date,
      timeSlots: timeSlots
    });

    
    await labSlot.save();

    res.status(201).json({ message: 'Time slots added successfully' });
  } catch (error) {
    console.error('Error adding time slots:', error);
    res.status(500).json({ message: 'Failed to add time slots. Please try again later.' });
  }
});




router.delete('/deleteTimeSlot/:labId/:date/:startTime', async (req, res) => {
    try {
      const { labId, date, startTime } = req.params;
  
      
      const labSlot = await LabSlot.findOne({ labId: labId, date: date });
  
      if (!labSlot) {
        return res.status(404).json({ message: 'Lab slot not found' });
      }
  
      
      const index = labSlot.timeSlots.findIndex(slot => slot.startTime === startTime);
  
      if (index === -1) {
        return res.status(404).json({ message: 'Time slot not found' });
      }
  
      
      labSlot.timeSlots.splice(index, 1);

      await labSlot.save();
  
      res.status(200).json({ message: 'Time slot deleted successfully' });
    } catch (error) {
      console.error('Error deleting time slot:', error);
      res.status(500).json({ message: 'Failed to delete time slot. Please try again later.' });
    }
  });
  
  module.exports = router;