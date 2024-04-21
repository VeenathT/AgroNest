const router = require('express').Router();
let LabSlot = require("../../../models/Oshini/lab_account/labSlot");


const addTimeSlots = async (date, labId) => {
    try {
      
      const startTime = moment(date).set({ hour: 8, minute: 0 }); 
      const endTime = moment(date).set({ hour: 17, minute: 0 }); 
  
      const timeSlots = [];

      for (let time = startTime.clone(); time.isBefore(endTime); time.add(1, 'hour')) {
       
        if (time.hour() >= 12 && time.hour() < 14) {
          continue;
        }
  
        
        const startTimeStr = time.format('HH:mm'); 
        const endTimeStr = time.clone().add(1, 'hour').format('HH:mm'); 
        const timeSlot = { startTime: startTimeStr, endTime: endTimeStr };
  
        
        timeSlots.push(timeSlot);
      }
  
      
      const labSlot = new LabSlot({
        labId: labId, 
        date: date, 
        timeSlots: timeSlots 
      });
  
      
      await labSlot.save();
  
      console.log('Time slots added for date:', date);
    } catch (error) {
      console.error('Error adding time slots:', error);
    }
  };

  module.exports = addTimeSlots;