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
    }
});

const Item = mongoose.model('Orders', itemSchema);
module.exports = Item;