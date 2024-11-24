// db.js
const mongoose = require('mongoose');

// Replace <username>, <password>, and <dbname> with your MongoDB credentials and database name
const uri = 'mongodb://admin:password123@localhost:27017/online_exam';
const connectDB = async () => {
    try {
        await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1); // Exit the process with failure
    }
};

module.exports = connectDB;