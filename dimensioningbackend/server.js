require('dotenv').config();
const cors = require('cors');
const express = require('express');

const calculationsroutes = require('./routes/calculations');
const bundleservices= require('./routes/bundleservices');
const bodyParser = require('body-parser');

const app = express();
const port = 5008;

// Middleware to parse JSON bodies
app.use(bodyParser.json());
// Use the CORS middleware
app.use(cors());

app.use('/api/calculation', calculationsroutes)
app.use('/api/bundleservices', bundleservices)

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
