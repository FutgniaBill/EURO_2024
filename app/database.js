const { MongoClient } = require('mongodb');

const url = `mongodb://${process.env.MONGODB_ROOT_USERNAME}:${process.env.MONGODB_ROOT_PASSWORD}@${process.env.MONGODB_SERVER}:27017/${process.env.MONGODB_DATABASE}`;

let client;

async function connectToDatabase() {
  try {
    client = new MongoClient(url, { useUnifiedTopology: true });
    await client.connect();
    console.log('Connected to the database');
    return client.db(process.env.MONGODB_DATABASE);
  } catch (error) {
    console.error('Error connecting to the database:', error);
  }
}

async function closeDatabaseConnection() {
  try {
    await client.close();
    console.log('Database connection closed');
  } catch (error) {
    console.error('Error closing the database connection:', error);
  }
}

module.exports = { connectToDatabase, closeDatabaseConnection };
