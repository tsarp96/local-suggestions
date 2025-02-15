const mongoose = require('mongoose');
const City = require('../models/Location');

const cities = [
  {
    name: 'İstanbul',
    districts: [
      { name: 'Adalar' },
      { name: 'Arnavutköy' },
      { name: 'Ataşehir' },
      { name: 'Avcılar' },
      { name: 'Bağcılar' },
      { name: 'Bahçelievler' },
      { name: 'Bakırköy' },
      { name: 'Başakşehir' },
      { name: 'Bayrampaşa' },
      { name: 'Beşiktaş' },
      { name: 'Beykoz' },
      { name: 'Beylikdüzü' },
      { name: 'Beyoğlu' },
      { name: 'Büyükçekmece' },
      { name: 'Çatalca' },
      { name: 'Çekmeköy' },
      { name: 'Esenler' },
      { name: 'Esenyurt' },
      { name: 'Eyüpsultan' },
      { name: 'Fatih' },
      { name: 'Gaziosmanpaşa' },
      { name: 'Güngören' },
      { name: 'Kadıköy' },
      { name: 'Kağıthane' },
      { name: 'Kartal' },
      { name: 'Küçükçekmece' },
      { name: 'Maltepe' },
      { name: 'Pendik' },
      { name: 'Sancaktepe' },
      { name: 'Sarıyer' },
      { name: 'Silivri' },
      { name: 'Sultanbeyli' },
      { name: 'Sultangazi' },
      { name: 'Şile' },
      { name: 'Şişli' },
      { name: 'Tuzla' },
      { name: 'Ümraniye' },
      { name: 'Üsküdar' },
      { name: 'Zeytinburnu' }
    ]
  }
];

mongoose.connect('mongodb://root:example@localhost:27017/local-suggestions?authSource=admin', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(async () => {
  console.log('Connected to MongoDB');
  try {
    // Clear existing cities
    await City.deleteMany({});
    console.log('Cleared existing cities');

    // Insert new cities
    const insertedCities = await City.insertMany(cities);
    console.log('Successfully added cities:', insertedCities.map(city => city.name));
    console.log(`Added ${insertedCities[0].districts.length} districts to İstanbul`);

    mongoose.connection.close();
    console.log('Database connection closed');
  } catch (error) {
    console.error('Error seeding locations:', error);
    mongoose.connection.close();
  }
})
.catch((err) => {
  console.error('MongoDB connection error:', err);
  process.exit(1);
}); 