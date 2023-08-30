// Import required modules
const express = require('express');

// Create an instance of Express
const app = express();

// Define a sample API endpoint
app.get('/', (req, res) => {
    const data = {
        message: 'Hello, this is a sample API!'
    };
    res.json(data);
});

let port = process.env.PORT || 3000
// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
