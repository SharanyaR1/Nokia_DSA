require('dotenv').config();

const cors = require('cors');
const express = require('express');
const calculationsroutes = require('./routes/calculations');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(bodyParser.json());
// Use the CORS middleware
app.use(cors());

app.use('/api/calculation', calculationsroutes)

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
