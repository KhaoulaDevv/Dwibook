// Import Cloudinary's v2 API and rename it to 'cloudinary' for easier reference
// Cloudinary is a cloud service that offers image and video management
import { v2 as cloudinary } from "cloudinary";

// Import the config function from dotenv package
// dotenv allows us to load environment variables from a .env file
import { config } from "dotenv";

// Initialize dotenv to load environment variables
// This makes variables from .env available in process.env
config();

// Configure the Cloudinary SDK with account credentials
// These values should be defined in your .env file for security
cloudinary.config({
  // Your Cloudinary cloud name (the subdomain of your Cloudinary URL)
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,

  // Your API Key (used for authentication)
  api_key: process.env.CLOUDINARY_API_KEY,

  // Your API Secret (keep this private)
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Export the configured Cloudinary instance
// This allows other files to import and use this pre-configured instance
export default cloudinary;
