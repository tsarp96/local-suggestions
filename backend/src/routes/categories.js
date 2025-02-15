const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Category = require('../models/Category');
const { body, validationResult } = require('express-validator');

// Get all categories
router.get('/', async (req, res) => {
  try {
    const categories = await Category.find().sort({ name: 1 });
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Create category (admin only - you might want to add admin middleware)
router.post('/',
  auth,
  [
    body('name').trim().isLength({ min: 2 }),
    body('description').optional().trim()
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const category = new Category(req.body);
      await category.save();
      
      res.status(201).json(category);
    } catch (error) {
      if (error.code === 11000) {
        return res.status(400).json({ message: 'Category already exists' });
      }
      res.status(500).json({ message: 'Server error' });
    }
  }
);

module.exports = router; 