// db.js
import mongoose from 'mongoose';

import dotenv from 'dotenv'


dotenv.config();



export async function connectDB() {
    console.log('env varialbe ' + process.env.MONGO_URI)
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`✅ MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.error('❌ MongoDB connection error:', error.message);
    process.exit(1); // Stop app if DB fails to connect
  }
}
