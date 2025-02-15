const mongoose = require('mongoose');

const citySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    districts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'District'
    }]
}, {
    timestamps: true
});

// Check if model exists before defining
module.exports = mongoose.models.City || mongoose.model('City', citySchema); 