const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const dealerSchema = new Schema({
    name : {
        type : String,
        required : true
    },
    address : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    phone : {
        type : String,
        required : true
    },
    storeLocation : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    reEnteredPassword : {
        type : String,
        required : true
    },
    username : {
        type : String,
        required : true,
        unique : true
    },
    fertilizers: [{
        type: Schema.Types.ObjectId,
        ref: 'fertilizer'
    }],
    rating : {
        type : Number,
        default : 4.5
    },
    
    
})

const Dealer = mongoose.model('dealer', dealerSchema);
module.exports = Dealer;