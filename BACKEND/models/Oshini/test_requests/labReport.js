const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const labReportSchema = new Schema({
    requestID: {
        type: Schema.Types.ObjectId,
        ref: 'TestRequest',
        required: true
      },
    pdf: {
        type: String,
        required: true
    },
    title:{
        type: String,
        required: true
    }  
  });
  
  const LabReport = mongoose.model('LabReport', labReportSchema);
  
  module.exports = LabReport;
  