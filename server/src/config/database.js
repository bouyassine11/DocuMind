import mongoose from 'mongoose';
import config from './config.js';

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(config.mongodb.uri, {
      serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
    });
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    
    // Handle connection events
    mongoose.connection.on('error', (err) => {
      console.error('❌ MongoDB connection error:', err);
    });
    
    mongoose.connection.on('disconnected', () => {
      console.log('⚠️  MongoDB disconnected');
    });
    
  } catch (error) {
    console.error('❌ MongoDB connection error:', error.message);
    console.error('Make sure MongoDB is running on:', config.mongodb.uri);
    process.exit(1);
  }
};

export default connectDB;
