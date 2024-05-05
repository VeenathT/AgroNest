const mongoose = require ('mongoose');

const Schema = mongoose.Schema;

const soilTestSchema = new Schema({
    soilTestType: {
        type: String,
        required: true
    },
    cropType: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    district: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    laboratory: {
        type: Schema.Types.ObjectId,
        ref: 'Laboratory'
    },
    status: {
        type: String,
        enum: ['pending', 'completed'],
        default: "pending"
    },
    pdfUrl: {
        type: String,
        required: false
    },
});

const SoilTest = mongoose.model("SoilTest", soilTestSchema);

module.exports = SoilTest;