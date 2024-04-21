const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const labSchema = new Schema({
    name : {
        type : String,
        required : true
    },
    address : {
        type : String,
        required : true
    },
    phone : {
        type : String,
        required : true
    },
    district : {
        type : String,
        required : true
    },
    city : {
        type : String,
        required : true
    },

    userName : {
        type : String,
        required : true,
        unique : true
    },

    password : {
        type : String,
        required : true
    },

    completed: {
        type: Number,
        default: 0 
    },
    rejected: {
        type: Number,
        default: 0 
    },
    level: {
        type: Number,
        default: 0
    }
    
})

const Lab = mongoose.model("labAccount",labSchema);
module.exports = Lab;