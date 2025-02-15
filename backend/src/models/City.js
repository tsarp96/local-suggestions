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

const City = mongoose.model('City', citySchema);

module.exports = City; 