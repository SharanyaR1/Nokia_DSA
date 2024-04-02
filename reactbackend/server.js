require('dotenv').config();
const cors = require('cors');
const express = require('express');

const calculateddataroutes = require('./routes/calculateddataroutes');
const projectroutes = require('./routes/projectroutes');
const bodyParser = require('body-parser');

const app = express();
const port = 4000;

// Middleware to parse JSON bodies
app.use(bodyParser.json());
// Use the CORS middleware
app.use(cors());

app.use('/api/calculateddata',calculateddataroutes )

app.use('/api/project',projectroutes)

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
