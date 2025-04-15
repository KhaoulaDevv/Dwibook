import mongoose from "mongoose"; // Import Mongoose for database interaction

// Define the schema for users
const userSchema = new mongoose.Schema(
  {
    email: {
      type: String, // User email address
      required: true, // Email is required
      unique: true, // Ensures no duplicate emails in the database
    },
    fullName: {
      type: String, // Full name of the user
      required: true, // Full name is required
    },
    password: {
      type: String, // Hashed password for authentication
      required: true, // Password is required
      minlength: 6, // Password must be at least 6 characters long
    },
    profilePic: {
      type: String, // URL of the user's profile picture
      default: "", // Default value is an empty string if not provided
    },
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt timestamps
);

// Create and export the User model
const User = mongoose.model("User", userSchema);
export default User;
