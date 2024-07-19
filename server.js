import { app } from './app.js';
import { config } from 'dotenv';
import Razorpay from 'razorpay';
import mongoose from "mongoose";

// Load environment variables
config({ path: './config/config.env' });

// Create an instance of Razorpay
const instance = new Razorpay({
  key_id: process.env.RAZORPAY_API_KEY,
  key_secret: process.env.RAZORPAY_API_SECRET,
});

const PORT = process.env.PORT || 4000;

// MongoDB connection function
const connectDB = async () => {
  try {
    const { connection } = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB connected: ${connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

// Start the server after connecting to MongoDB
const startServer = async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`Server is working on ${PORT}`);
  });
};

startServer();

export { instance };
