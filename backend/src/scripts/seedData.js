require('dotenv').config();
const mongoose = require('mongoose');
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
            'Adalar',
            'Arnavutköy',
            'Ataşehir',
            'Avcılar',
            'Bağcılar',
            'Bahçelievler',
            'Bakırköy',
            'Başakşehir',
            'Bayrampaşa',
            'Beşiktaş',
            'Beykoz',
            'Beylikdüzü',
            'Beyoğlu',
            'Büyükçekmece',
            'Çatalca',
            'Çekmeköy',
            'Esenler',
            'Esenyurt',
            'Eyüpsultan',
            'Fatih',
            'Gaziosmanpaşa',
            'Güngören',
            'Kadıköy',
            'Kağıthane',
            'Kartal',
            'Küçükçekmece',
            'Maltepe',
            'Pendik',
            'Sancaktepe',
            'Sarıyer',
            'Silivri',
            'Sultanbeyli',
            'Sultangazi',
            'Şile',
            'Şişli',
            'Tuzla',
            'Ümraniye',
            'Üsküdar',
            'Zeytinburnu'
        ]
    }
];

async function seedData() {
    try {
        const MONGODB_URI = process.env.MONGODB_URI;
        if (!MONGODB_URI) {
            throw new Error('MONGODB_URI environment variable is not set!');
        }

        await mongoose.connect(MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Connected to MongoDB');

        // Clear existing data
        await Category.deleteMany({});
        await City.deleteMany({});
        await District.deleteMany({});
        console.log('Cleared existing data');

        // Seed categories
        const insertedCategories = await Category.insertMany(categories);
        console.log('Successfully added categories:', insertedCategories.map(cat => cat.name));

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
            
            console.log(`Added city ${city.name} with ${districts.length} districts`);
        }

        console.log('Data seeding completed successfully');
    } catch (error) {
        console.error('Error seeding data:', error);
    } finally {
        await mongoose.connection.close();
        console.log('Database connection closed');
    }
}

seedData(); 