const { MongoClient } = require('mongodb');

const uri = "mongodb+srv://admin:database123@cluster0.rtvn5yt.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const client = new MongoClient(uri);

async function testConnection() {
    try {
        await client.connect();
        console.log("Connected to MongoDB successfully");
        const collection = client.db("GrowwDB").collection("GrowwDBCollection");
        const items = await collection.find({}).toArray();
        console.log(items);
    } catch (error) {
        console.error('Failed to connect to MongoDB', error);
    } finally {
        await client.close();
    }
}

testConnection();
