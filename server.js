const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan'); 
const path = require('path');
const bcrypt = require('bcryptjs');  // ✅ Using bcryptjs instead of bcrypt
const User = require('./models/User');
const fetch = require('node-fetch'); // Required for making API calls

const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'views')));
app.use(express.static('public'));

mongoose.connect('mongodb://127.0.0.1:27017/project_1')
    .then(() => console.log('✅ Connected to MongoDB'))
    .catch(err => console.error('❌ MongoDB connection error:', err));

// Basic Routes
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'index.html')));
app.get('/register.html', (req, res) => res.sendFile(path.join(__dirname, 'views', 'register.html')));
app.get('/login.html', (req, res) => res.sendFile(path.join(__dirname, 'views', 'login.html')));
app.get('/road_map.html', (req, res) => res.sendFile(path.join(__dirname, 'views', 'road_map.html')));
app.get('/forgot-password.html', (req, res) => res.sendFile(path.join(__dirname, 'views', 'forgot-password.html')));
app.get('/dashboard.html', (req, res) => res.sendFile(path.join(__dirname, 'views', 'dashboard.html')));
app.get('/crop-prediction', (req, res) => res.sendFile(path.join(__dirname, 'views', 'inputs.html')));

// User Registration
app.post('/signup-form', async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already registered' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ firstName, lastName, email, password: hashedPassword });
        await newUser.save();

        res.status(201).json({ message: 'Registration successful', redirectUrl: '/login.html' });
    } catch (error) {
        console.error('❌ Registration error:', error);
        res.status(500).json({ message: 'Error registering user' });
    }
});

// User Login
app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        res.json({ message: 'Login successful', redirectUrl: '/dashboard.html' });
    } catch (error) {
        console.error('❌ Login error:', error);
        res.status(500).json({ message: 'Error logging in' });
    }
});

// 🔥 Crop Prediction Route (Calls Flask API)
app.post('/predict', async (req, res) => {
    try {
        const userInput = req.body; // Get user input from frontend
        
        const response = await fetch('http://127.0.0.1:5000/predict', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userInput),
        });

        const data = await response.json();
        console.log('✅ API Response:', data);

        if (response.ok) {
            res.json(data); // Send the prediction back to the frontend
        } else {
            res.status(500).json({ error: 'Prediction failed' });
        }
    } catch (error) {
        console.error('❌ Error in prediction:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server is running on port ${PORT}`));