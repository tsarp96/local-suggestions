const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Suggestion = require('../models/Suggestion');
const { body, validationResult } = require('express-validator');

// Get all suggestions with filters
router.get('/', async (req, res) => {
  try {
    const { location, category, sort = 'newest' } = req.query;
    
    let query = {};
    if (location) query.location = location;
    if (category) query.category = category;

    let sortOption = {};
    if (sort === 'newest') sortOption = { createdAt: -1 };
    if (sort === 'popular') sortOption = { voteCount: -1 };

    const suggestions = await Suggestion.find(query)
      .sort(sortOption)
      .populate('author', 'username')
      .populate('category', 'name');

    res.json(suggestions);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Create suggestion
router.post('/',
  auth,
  [
    body('title').trim().isLength({ min: 3 }),
    body('description').trim().isLength({ min: 10 }),
    body('location').exists(),
    body('category').exists(),
    body('coordinates').exists()
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const suggestion = new Suggestion({
        ...req.body,
        author: req.userId,
        votes: { likes: [], unlikes: [] }
      });

      await suggestion.save();
      
      await suggestion.populate('author', 'username');
      await suggestion.populate('category', 'name');

      res.status(201).json(suggestion);
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  }
);

// Vote suggestion
router.post('/:id/vote',
  auth,
  async (req, res) => {
    try {
      const { type } = req.body; // 'like' or 'unlike'
      const suggestion = await Suggestion.findById(req.params.id);
      
      if (!suggestion) {
        return res.status(404).json({ message: 'Suggestion not found' });
      }

      // Remove user from both arrays first
      suggestion.votes.likes = suggestion.votes.likes.filter(
        id => id.toString() !== req.userId
      );
      suggestion.votes.unlikes = suggestion.votes.unlikes.filter(
        id => id.toString() !== req.userId
      );

      // Add vote to appropriate array
      if (type === 'like') {
        suggestion.votes.likes.push(req.userId);
      } else if (type === 'unlike') {
        suggestion.votes.unlikes.push(req.userId);
      }

      await suggestion.save();
      res.json(suggestion);
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  }
);

// Toggle favorite
router.post('/:id/favorite',
  auth,
  async (req, res) => {
    try {
      const user = await User.findById(req.userId);
      const suggestionId = req.params.id;

      const index = user.favorites.indexOf(suggestionId);
      if (index > -1) {
        user.favorites.splice(index, 1);
      } else {
        user.favorites.push(suggestionId);
      }

      await user.save();
      res.json({ favorites: user.favorites });
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  }
);

module.exports = router; 