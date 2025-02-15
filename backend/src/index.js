require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');

const authRoutes = require('./routes/auth');
const suggestionRoutes = require('./routes/suggestions');
const categoryRoutes = require('./routes/categories');
const locationRoutes = require('./routes/locations');
const adminRoutes = require('./routes/admin');

const app = express();

// Middleware
app.use(cors({
    origin: ['https://local-suggestions-frontend.onrender.com', 'http://localhost:3000'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
    optionsSuccessStatus: 200
}));

// Disable certain helmet middleware that might block ngrok
app.use(helmet({
    crossOriginResourcePolicy: false,
    crossOriginOpenerPolicy: false,
    crossOriginEmbedderPolicy: false,
}));
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/suggestions', suggestionRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/locations', locationRoutes);
app.use('/api/admin', adminRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.status(200).json({ status: 'healthy' });
});

// MongoDB connection
const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
    console.error('MONGODB_URI environment variable is not set!');
    process.exit(1);
}

console.log('Attempting to connect to MongoDB...');
console.log('Connection string:', MONGODB_URI.replace(/:[^:@]+@/, ':****@')); // Hide password in logs

mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    retryWrites: true,
    w: 'majority',
})
.then(() => {
    console.log('Connected to MongoDB successfully');
    // Log database information
    const db = mongoose.connection.db;
    console.log('Connected to database:', db.databaseName);
})
.catch((err) => {
    console.error('MongoDB connection error details:', {
        name: err.name,
        message: err.message,
        code: err.code,
        codeName: err.codeName
    });
    // Don't exit the process, let the application continue
    // The health check will still work even if DB is down
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Error:', err.stack);
    res.status(500).json({ 
        message: 'Something went wrong!',
        error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
}); 