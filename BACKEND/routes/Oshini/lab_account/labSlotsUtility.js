const router = require('express').Router();
let LabSlot = require("../../../models/Oshini/lab_account/labSlot");


const addTimeSlots = async (date, labId) => {
    try {
      // Initialize the start time and end time for the time slots
      const startTime = moment(date).set({ hour: 8, minute: 0 }); // Start at 8:00 AM
      const endTime = moment(date).set({ hour: 17, minute: 0 }); // End at 5:00 PM
  
      // Initialize an array to store time slot objects
      const timeSlots = [];
  
      // Loop through the time range in hourly intervals
      for (let time = startTime.clone(); time.isBefore(endTime); time.add(1, 'hour')) {
        // Skip the time range from 12:00 PM to 2:00 PM
        if (time.hour() >= 12 && time.hour() < 14) {
          continue; // Skip this iteration
        }
  
        // Create a time slot object for the current hour
        const startTimeStr = time.format('HH:mm'); // Format start time as "HH:mm"
        const endTimeStr = time.clone().add(1, 'hour').format('HH:mm'); // End time is 1 hour later
        const timeSlot = { startTime: startTimeStr, endTime: endTimeStr };
  
        // Add the time slot object to the array
        timeSlots.push(timeSlot);
      }
  
      // Create a new LabSlot document to save to the database
      const labSlot = new LabSlot({
        labId: labId, // Lab ID reference
        date: date, // Date of the time slots
        timeSlots: timeSlots // Array of time slots
      });
  
      // Save the LabSlot document to the database
      await labSlot.save();
  
      console.log('Time slots added for date:', date);
    } catch (error) {
      console.error('Error adding time slots:', error);
    }
  };

  module.exports = addTimeSlots;