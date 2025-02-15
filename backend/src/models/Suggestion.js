const mongoose = require('mongoose');

const suggestionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  votes: {
    likes: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }],
    unlikes: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }]
  },
  coordinates: {
    type: {
      type: String,
      enum: ['Point'],
      required: true
    },
    coordinates: {
      type: [Number],
      required: true
    }
  },
  images: [{
    type: String
  }]
}, {
  timestamps: true
});

// Create geospatial index for location-based queries
suggestionSchema.index({ coordinates: '2dsphere' });

// Virtual for vote count
suggestionSchema.virtual('voteCount').get(function() {
  return this.votes.likes.length - this.votes.unlikes.length;
});

const Suggestion = mongoose.model('Suggestion', suggestionSchema);

module.exports = Suggestion; 