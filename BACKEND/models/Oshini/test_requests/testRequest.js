const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const testRequestSchema = new Schema({
  farmerID: {
    type: Schema.Types.ObjectId,
    ref: 'Farmer', // Reference to the Farmer model
    required: true
  },
  labID: {
    type: Schema.Types.ObjectId,
    ref: 'Lab', // Reference to the Lab model
    required: true
  },
  testType: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  startTime: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'], // Status can be one of these values
    default: 'pending' // Default status is 'pending'
  }
});

const TestRequest = mongoose.model('TestRequest', testRequestSchema);

module.exports = TestRequest;
