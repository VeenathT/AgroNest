const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const fertilizerSchema = new Schema({
    name : {
        type : String,
        required : true
    },
    itemcode : {
        type : Number,
        required : true
    },
    price : {
        type : Number,
        required : true
    },
    quantity : {
        type : Number,
        required : true
    }
})

const Fertilizer = mongoose.model('fertilizer', fertilizerSchema);
module.exports = Fertilizer;