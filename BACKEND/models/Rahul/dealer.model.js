const mongoose = require('mongoose');

const viewDealerSchema = new mongoose.Schema({
    name: String,
    address: String,
    email: String,
    phone: String,
    storeLocation: String,
    username: String
});

module.exports = mongoose.model('viewDealer', viewDealerSchema);
