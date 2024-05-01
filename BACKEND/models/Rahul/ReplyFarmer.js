const mongoose = require('mongoose');

const replySchema = new mongoose.Schema({
  farmerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'FarmerReport', // Assuming your original model is named FarmerReport
    required: true,
  },
  replyText: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Reply = mongoose.model('ReplyFarmer', replySchema);

module.exports = Reply;
