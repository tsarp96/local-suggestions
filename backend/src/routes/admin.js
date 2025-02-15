const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Category = require('../models/Category');
const City = require('../models/City');
const District = require('../models/District');

const categories = [
    {
        name: 'Restaurants & Cafes',
        description: 'Places to eat and drink, including restaurants, cafes, bars, and food trucks',
        icon: '🍽️'
    },
    {
        name: 'Shopping',
        description: 'Retail stores, malls, markets, and shopping centers',
        icon: '🛍️'
    },
    {
        name: 'Entertainment',
        description: 'Movie theaters, concert venues, theaters, and other entertainment spots',
        icon: '🎭'
    },
    {
        name: 'Parks & Recreation',
        description: 'Parks, playgrounds, hiking trails, and recreational areas',
        icon: '🌳'
    },
    {
        name: 'Cultural Sites',
        description: 'Museums, art galleries, historical landmarks, and cultural centers',
        icon: '🏛️'
    }
];

const cities = [
    {
        name: 'Istanbul',
        districts: [
            'Adalar', 'Arnavutköy', 'Ataşehir', 'Avcılar', 'Bağcılar',
            'Bahçelievler', 'Bakırköy', 'Başakşehir', 'Bayrampaşa', 'Beşiktaş',
            'Beykoz', 'Beylikdüzü', 'Beyoğlu', 'Büyükçekmece', 'Çatalca',
            'Çekmeköy', 'Esenler', 'Esenyurt', 'Eyüpsultan', 'Fatih',
            'Gaziosmanpaşa', 'Güngören', 'Kadıköy', 'Kağıthane', 'Kartal',
            'Küçükçekmece', 'Maltepe', 'Pendik', 'Sancaktepe', 'Sarıyer',
            'Silivri', 'Sultanbeyli', 'Sultangazi', 'Şile', 'Şişli',
            'Tuzla', 'Ümraniye', 'Üsküdar', 'Zeytinburnu'
        ]
    }
];

// Protected route that requires authentication and admin role
router.post('/seed', auth, async (req, res) => {
    try {
        // Check if user is admin
        if (!req.user.isAdmin) {
            return res.status(403).json({ message: 'Admin access required' });
        }

        // Clear existing data
        await Category.deleteMany({});
        await City.deleteMany({});
        await District.deleteMany({});

        // Seed categories
        const insertedCategories = await Category.insertMany(categories);

        // Seed cities and districts
        for (const cityData of cities) {
            const city = await City.create({ name: cityData.name });
            
            const districts = await Promise.all(
                cityData.districts.map(districtName => 
                    District.create({
                        name: districtName,
                        city: city._id
                    })
                )
            );
            
            city.districts = districts.map(d => d._id);
            await city.save();
        }

        res.json({ 
            message: 'Data seeded successfully',
            categories: insertedCategories.map(cat => cat.name),
            cities: cities.map(city => ({
                name: city.name,
                districtCount: city.districts.length
            }))
        });
    } catch (error) {
        console.error('Seeding error:', error);
        res.status(500).json({ message: 'Error seeding data', error: error.message });
    }
});

module.exports = router; 