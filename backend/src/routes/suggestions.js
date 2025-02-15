const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Suggestion = require('../models/Suggestion');

// Get all suggestions
router.get('/', async (req, res) => {
  try {
    const suggestions = await Suggestion.find()
      .sort({ createdAt: -1 })
      .populate('author', 'username')
      .populate('category', 'name');

    res.json(suggestions);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Create suggestion
router.post('/', auth, async (req, res) => {
  try {
    const suggestion = new Suggestion({
      ...req.body,
      author: req.user._id,
      votes: { likes: [], unlikes: [] }
    });

    await suggestion.save();
    await suggestion.populate('author', 'username');
    await suggestion.populate('category', 'name');

    res.status(201).json(suggestion);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router; 