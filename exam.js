// Exam.js
const mongoose = require('mongoose');

const ExamSchema = new mongoose.Schema({
    title: { type: String, required: true },
    questions: [{ type: String, required: true }],
    duration: { type: Number, required: true }, // Duration in minutes
});

module.exports = mongoose.model('Exam', ExamSchema);