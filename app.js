// app.js
const express = require('express');
const connectDB = require('./db');
const Exam = require('./Exam'); // Import the Exam model

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Middleware to parse JSON requests
app.use(express.json());

// Sample route
app.get('/', (req, res) => {
    res.send('Welcome to the Online Exam App API!');
});

// Create a new exam
app.post('/exams', async (req, res) => {
    const { title, questions, duration } = req.body;
    const exam = new Exam({ title, questions, duration });
    try {
        await exam.save();
        res.status(201).json(exam);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Get all exams
app.get('/exams', async (req, res) => {
    try {
        const exams = await Exam.find();
        res.json(exams);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});