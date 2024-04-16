const mongoose = require('mongoose');

const DealerSchema = new mongoose.Schema({
    name: String,
    address: String,
    email: String,
    phone: String,
    storeLocation: String,
    username: String
});

module.exports = mongoose.model('Dealer', DealerSchema);