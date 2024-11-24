// server.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const multer = require('multer');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/duchs-online', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('MongoDB connected');
}).catch(err => {
    console.error('MongoDB connection error:', err);
});

// Define Question Schema
const questionSchema = new mongoose.Schema({
    questionText: String,
    score: Number,
    options: [{ text: String, isCorrect: Boolean }],
});

const Question = mongoose.model('Question', questionSchema);

// Endpoint to import questions
app.post('/import-questions', (req, res) => {
    const questionsData = req.body.questions; // Expecting an array of question objects
    Question.insertMany(questionsData)
        .then(() => res.status(200).json({ message: 'Questions imported successfully!' }))
        .catch(err => res.status(500).json({ error: err.message }));
});

// Endpoint to get all questions
app.get('/questions', (req, res) => {
    Question.find()
        .then(questions => res.status(200).json(questions))
        .catch(err => res.status(500).json({ error: err.message }));
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});