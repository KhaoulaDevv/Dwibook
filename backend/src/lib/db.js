// Import the mongoose library
// Mongoose is an Object Data Modeling (ODM) library for MongoDB and Node.js
// It provides a schema-based solution to model application data
import mongoose from "mongoose";

/**
 * Establishes a connection to MongoDB database
 *
 * This function connects to the MongoDB database using the connection string
 * stored in environment variables. It logs the successful connection or
 * any errors that occur during the connection attempt.
 *
 * @returns {Promise<void>} - A promise that resolves when connected
 */
export const connectDB = async () => {
  try {
    // Attempt to connect to MongoDB using the connection string from environment variables
    // This returns a connection object that we can use to check the connection status
    const conn = await mongoose.connect(process.env.MONGODB_URI);

    // Log successful connection along with the connected host
    // conn.connection.host shows which server we're connected to

    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    // Log any errors that occur during connection
    // This provides visibility into connection issues for debugging
    console.log("MongoDB connection error:", error);
  }
};
