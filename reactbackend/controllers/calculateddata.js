//Here we are returning the calculated data from the database to display on the dimensioning output page

require('dotenv').config();
const { MongoClient } = require('mongodb');
async function connectToMongoDB() {
    try {     
        const uri = process.env.MONGODB_URI;
        const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

        await client.connect();
        console.log('Connected to MongoDB successfullyy');
        return client.db('dimensioning-inputs').collection('dummy');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        return null;
    }
}


const data = async (req, res) => {
    const collection = await connectToMongoDB();

    if (!collection) {
        return res.status(500).json({ error: 'Failed to connect to MongoDB' });
    }

    try {
        // Find the latest document by sorting in descending order and limiting to one document
        const latestDocument = await collection.find({}, { projection: { _id: 0 ,projectId:0
        } })
                                               .sort({ _id: -1 }) // Sort by _id field in descending order
                                               .limit(1) // Limit to one document
                                               .toArray();

        // Send the latest document as a response
        res.status(200).json(latestDocument[0]); // Send the first (and only) element of the array
    } catch (error) {
        console.error('Error fetching data from MongoDB:', error);
        res.status(500).json({ error: 'Failed to fetch data from MongoDB' });
    }
}





module.exports = {
    data
};