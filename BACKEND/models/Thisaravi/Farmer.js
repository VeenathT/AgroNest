const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const farmerSchema = new Schema({

    first_name :{
        type : String,
        required : true
    },
    last_name :{
        type : String,
        required : true
    },
    email :{
        type : String,
        required : true
    },
    phone :{
        type : Number,
        required : true
    },
    district :{
        type : String,
        required : true
    },
    city :{
        type : String,
        required : true
    },
    userName :{
        type : String,
        required : true
    },
    password :{
        type : String,
        required : true
    }

})

const Farmer = mongoose.model("Farmer",farmerSchema);

module.exports = Farmer;

