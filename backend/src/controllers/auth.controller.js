import { generateToken } from "../lib/utils.js"; // Import function to generate JWT token
import User from "../models/user.model.js"; // Import User model for database operations
import bcrypt from "bcryptjs"; // Import bcrypt for password hashing
import cloudinary from "../lib/cloudinary.js"; // Import cloudinary for image uploading

// Signup controller
export const signup = async (req, res) => {
  const { fullName, email, password } = req.body; // Extract user input from request body
  try {
    // Check if all required fields are provided
    if (!fullName || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Validate password length
    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters" });
    }

    // Check if user with the given email already exists
    const user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: "Email already exists" });

    // Hash the password before saving
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user instance
    const newUser = new User({
      fullName,
      email,
      password: hashedPassword,
    });

    if (newUser) {
      // Generate JWT token for authentication
      generateToken(newUser._id, res);
      await newUser.save(); // Save user to database

      // Return user details (excluding password)
      res.status(201).json({
        _id: newUser._id,
        fullName: newUser.fullName,
        email: newUser.email,
        profilePic: newUser.profilePic,
      });
    } else {
      res.status(400).json({ message: "Invalid user data" });
    }
  } catch (error) {
    console.log("Error in signup controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Login controller
export const login = async (req, res) => {
  const { email, password } = req.body; // Extract user input from request body
  try {
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Compare provided password with stored hashed password
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Generate JWT token
    generateToken(user._id, res);

    // Return user details
    res.status(200).json({
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      profilePic: user.profilePic,
    });
  } catch (error) {
    console.log("Error in login controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Logout controller
export const logout = (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 }); // Clear JWT token by setting an empty cookie
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.log("Error in logout controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Update profile controller
export const updateProfile = async (req, res) => {
  try {
    const { profilePic } = req.body; // Extract profile picture from request body
    const userId = req.user._id; // Get authenticated user ID from request

    if (!profilePic) {
      return res.status(400).json({ message: "Profile pic is required" });
    }

    // Upload new profile picture to Cloudinary
    const uploadResponse = await cloudinary.uploader.upload(profilePic);

    // Update user profile with new picture URL
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { profilePic: uploadResponse.secure_url },
      { new: true } // Return updated user data
    );

    res.status(200).json(updatedUser); // Respond with updated user data
  } catch (error) {
    console.log("error in update profile:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Check authentication status
export const checkAuth = (req, res) => {
  try {
    res.status(200).json(req.user); // Return authenticated user data
  } catch (error) {
    console.log("Error in checkAuth controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
