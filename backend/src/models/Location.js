const mongoose = require('mongoose');

const districtSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  }
});

const citySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  districts: [districtSchema]
}, {
  timestamps: true
});

const City = mongoose.model('City', citySchema);
module.exports = City; 