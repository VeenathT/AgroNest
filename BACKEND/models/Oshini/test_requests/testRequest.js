const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const testRequestSchema = new Schema({
  farmerID: {
    type: Schema.Types.ObjectId,
    ref: 'Farmer',
    required: true
  },
  labID: {
    type: Schema.Types.ObjectId,
    ref: 'Lab', 
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
    enum: ['pending', 'approved', 'rejected' , 'completed'], 
    default: 'pending' 
  }
});



const TestRequest = mongoose.model('TestRequest', testRequestSchema);

module.exports = TestRequest;
