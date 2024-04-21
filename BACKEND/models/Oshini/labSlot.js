const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const labSlotSchema = new Schema({
  labId: {
    type: Schema.Types.ObjectId,
    ref: 'Lab', 
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


const LabSlot = mongoose.model('LabSlot', labSlotSchema);

module.exports = LabSlot;
