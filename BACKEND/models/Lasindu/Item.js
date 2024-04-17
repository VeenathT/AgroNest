const mongoose = require('mongoose');

const schema = mongoose.Schema;

const itemSchema = new schema({
    name: {
        type: String,
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

const Item = mongoose.model('fertilizerTB', itemSchema);
module.exports = Item;