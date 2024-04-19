const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the LabSlot schema
const labSlotSchema = new Schema({
  labId: {
    type: Schema.Types.ObjectId,
    ref: 'Lab', // Reference to the Lab model
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  timeSlots: [
    {
      startTime: {
        type: String,
        required: true
      },
      endTime: {
        type: String,
        required: true
      }
    }
  ]
});

// Create the LabSlot model
const LabSlot = mongoose.model('LabSlot', labSlotSchema);

module.exports = LabSlot;
