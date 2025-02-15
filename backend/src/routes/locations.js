const express = require('express');
const router = express.Router();
const City = require('../models/Location');

// Get all cities
router.get('/cities', async (req, res) => {
  try {
    const cities = await City.find().sort({ name: 1 });
    res.json(cities);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get a specific city with its districts
router.get('/cities/:cityId', async (req, res) => {
  try {
    const city = await City.findById(req.params.cityId);
    if (!city) {
      return res.status(404).json({ message: 'City not found' });
    }
    res.json(city);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get districts of a city
router.get('/cities/:cityId/districts', async (req, res) => {
  try {
    const city = await City.findById(req.params.cityId);
    if (!city) {
      return res.status(404).json({ message: 'City not found' });
    }
    res.json(city.districts);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router; 