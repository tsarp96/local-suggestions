const mongoose = require('mongoose');
const Category = require('../models/Category');

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
    name: 'Public Services',
    description: 'Government offices, libraries, post offices, and community centers',
    icon: '🏛️'
  },
  {
    name: 'Transportation',
    description: 'Bus stops, train stations, bike sharing, and parking facilities',
    icon: '🚌'
  },
  {
    name: 'Education',
    description: 'Schools, universities, training centers, and educational facilities',
    icon: '📚'
  },
  {
    name: 'Healthcare',
    description: 'Hospitals, clinics, pharmacies, and medical facilities',
    icon: '🏥'
  },
  {
    name: 'Cultural Sites',
    description: 'Museums, art galleries, historical landmarks, and cultural centers',
    icon: '🏛️'
  },
  {
    name: 'Sports & Fitness',
    description: 'Gyms, sports facilities, fitness centers, and athletic fields',
    icon: '⚽'
  }
];

mongoose.connect('mongodb://root:example@localhost:27017/local-suggestions?authSource=admin', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(async () => {
  console.log('Connected to MongoDB');
  try {
    // Clear existing categories
    await Category.deleteMany({});
    console.log('Cleared existing categories');

    // Insert new categories
    const insertedCategories = await Category.insertMany(categories);
    console.log('Successfully added categories:', insertedCategories.map(cat => cat.name));

    mongoose.connection.close();
    console.log('Database connection closed');
  } catch (error) {
    console.error('Error seeding categories:', error);
    mongoose.connection.close();
  }
})
.catch((err) => {
  console.error('MongoDB connection error:', err);
  process.exit(1);
}); 