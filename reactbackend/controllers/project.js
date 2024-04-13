//Here from the frontend we are sending the project details to the backend and storing it in the database

require('dotenv').config();
const { MongoClient } = require('mongodb');
async function connectToMongoDB() {
    try {     
        const uri = process.env.MONGODB_URI;
        const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

        await client.connect();
        console.log('Connected to MongoDB successfullyy');
        return client.db('dimensioning-inputs').collection('project');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        return null;
    }
}


const storeprojectdetails = async (req, res) => {

    console.log("hi")
    const collection = await connectToMongoDB();

    if (!collection) {
        return res.status(500).json({ error: 'Failed to connect to MongoDB' });
    }

    try {
        console.log(req.body)
        const projectdetails = req.body;
        console.log(projectdetails);
        await collection.insertOne(projectdetails);
        res.status(201).json({ message: 'Project details stored successfully' });

    } 
    
    catch (error) {
        console.log("Error")
        console.error('Error inserting document into MongoDB:', error);
        res.status(500).json({ error: 'Failed to insert document into MongoDB' });
    }


}

const getprojectdetails = async (req, res) => {
    const collection = await connectToMongoDB();

    if (!collection) {
        return res.status(500).json({ error: 'Failed to connect to MongoDB' });
    }

    try {
        const projectdetails = await collection.find().limit(1).sort({$natural:-1}).toArray();
        res.status(200).json(projectdetails);
    } catch (error) {
        console.error('Error fetching project details from MongoDB:', error);
        res.status(500).json({ error: 'Failed to fetch project details from MongoDB' });
    }
}

module.exports = {
    storeprojectdetails,getprojectdetails
};


