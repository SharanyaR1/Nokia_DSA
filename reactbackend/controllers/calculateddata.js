

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

    //store the data from db and send response to frontend 

}

 


module.exports = {
    data
};