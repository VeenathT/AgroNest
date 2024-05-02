const mongoose = require('mongoose');

const schema = mongoose.Schema;

const itemSchema = new schema({
    name: {
        type: String,
        required: true
    },
    itemcode: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    
    },
    quantity: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        required: true,
        default: "Pending"
    }
});

const Item = mongoose.model('Orders', itemSchema);
module.exports = Item;