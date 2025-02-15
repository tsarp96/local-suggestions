const express = require('express');
const router = express.Router();
const City = require('../models/Location');
const { requireAdmin } = require('../middleware/auth');

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

// Create a new city (Admin only)
router.post('/cities', requireAdmin, async (req, res) => {
  try {
    const { name } = req.body;
    const city = new City({ name, districts: [] });
    await city.save();
    res.status(201).json(city);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Update a city (Admin only)
router.put('/cities/:cityId', requireAdmin, async (req, res) => {
  try {
    const { name } = req.body;
    const city = await City.findByIdAndUpdate(
      req.params.cityId,
      { name },
      { new: true }
    );
    if (!city) {
      return res.status(404).json({ message: 'City not found' });
    }
    res.json(city);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete a city (Admin only)
router.delete('/cities/:cityId', requireAdmin, async (req, res) => {
  try {
    const city = await City.findByIdAndDelete(req.params.cityId);
    if (!city) {
      return res.status(404).json({ message: 'City not found' });
    }
    res.json({ message: 'City deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Add a district to a city (Admin only)
router.post('/cities/:cityId/districts', requireAdmin, async (req, res) => {
  try {
    const { name } = req.body;
    const city = await City.findById(req.params.cityId);
    
    if (!city) {
      return res.status(404).json({ message: 'City not found' });
    }

    city.districts.push({ name });
    await city.save();
    res.status(201).json(city);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete a district from a city (Admin only)
router.delete('/cities/:cityId/districts/:districtId', requireAdmin, async (req, res) => {
  try {
    const city = await City.findById(req.params.cityId);
    
    if (!city) {
      return res.status(404).json({ message: 'City not found' });
    }

    city.districts = city.districts.filter(
      district => district._id.toString() !== req.params.districtId
    );
    
    await city.save();
    res.json(city);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router; 