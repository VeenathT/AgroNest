const mongoose = require('mongoose');

const viewFarmerSchema = new mongoose.Schema({
    first_name: String,
    email: String,
    phone: String,
    district:String,
    city:String,
    

});

module.exports = mongoose.model('viewFarmer', viewFarmerSchema);