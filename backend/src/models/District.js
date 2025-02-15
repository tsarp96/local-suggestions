const mongoose = require('mongoose');

const districtSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    city: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'City',
        required: true
    }
}, {
    timestamps: true
});

// Compound index to ensure unique district names within a city
districtSchema.index({ name: 1, city: 1 }, { unique: true });

// Check if model exists before defining
module.exports = mongoose.models.District || mongoose.model('District', districtSchema); 