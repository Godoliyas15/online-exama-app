// server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors()); // Enable CORS for all routes
app.use(bodyParser.json()); // Parse JSON bodies

// Endpoint to collect exam responses
app.post('/submit-results', (req, res) => {
    const { score, total } = req.body;

    // Here you can process the data, e.g., save it to a database
    console.log(`Received score: ${score} out of ${total}`);

    // Respond back to the client
    res.json({ message: 'Results received successfully!', score, total });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});