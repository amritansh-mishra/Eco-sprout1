const mongoose = require('mongoose');

const MAX_RETRIES = 10;
const RETRY_DELAY_MS = 3000;

const connectWithRetry = async (attempt = 1) => {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.error('Database connection error: MONGODB_URI is not set in environment variables.');
    process.exit(1);
  }

  try {
    const conn = await mongoose.connect(uri); 
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    console.error(`MongoDB connection attempt ${attempt} failed: ${error.message}`);
    if (attempt < MAX_RETRIES) {
      console.log(`Retrying to connect to MongoDB in ${Math.round(RETRY_DELAY_MS / 1000)}s... (${attempt}/${MAX_RETRIES})`);
      await new Promise((res) => setTimeout(res, RETRY_DELAY_MS));
      return connectWithRetry(attempt + 1);
    }
    console.error('Exceeded maximum MongoDB connection attempts. Exiting.');
    process.exit(1);
  }
};

const connectDB = () => connectWithRetry();

module.exports = connectDB;