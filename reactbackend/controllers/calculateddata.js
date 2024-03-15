

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
        const latestDocument = await collection.find({}, { projection: { _id: 0 } })
                                                .limit(1)
                                                .sort({ $natural: -1 })
                                                .toArray();

        // Send the latest document as a response
        res.status(200).json(latestDocument[0]); // Send the first element of the array
    } catch (error) {
        console.error('Error fetching data from MongoDB:', error);
        res.status(500).json({ error: 'Failed to fetch data from MongoDB' });
    }
}





module.exports = {
    data
};