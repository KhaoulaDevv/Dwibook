import User from "../models/user.model.js"; // Import User model for database operations
import Message from "../models/message.model.js"; // Import Message model for chat messages

import cloudinary from "../lib/cloudinary.js"; // Import Cloudinary for image uploading
import { getReceiverSocketId, io } from "../lib/socket.js"; // Import socket functions for real-time messaging

// Get list of users for sidebar, excluding logged-in user
export const getUsersForSidebar = async (req, res) => {
  try {
    const loggedInUserId = req.user._id; // Get logged-in user's ID

    // Fetch all users except the logged-in user and exclude their passwords
    const filteredUsers = await User.find({
      _id: { $ne: loggedInUserId },
    }).select("-password");

    res.status(200).json(filteredUsers); // Return list of users
  } catch (error) {
    console.error("Error in getUsersForSidebar: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Fetch messages between logged-in user and another user
export const getMessages = async (req, res) => {
  try {
    const { id: userToChatId } = req.params; // Get the user ID from request parameters
    const myId = req.user._id; // Get logged-in user's ID

    // Fetch messages where the logged-in user is either sender or receiver
    const messages = await Message.find({
      $or: [
        { senderId: myId, receiverId: userToChatId },
        { senderId: userToChatId, receiverId: myId },
      ],
    });

    res.status(200).json(messages); // Return retrieved messages
  } catch (error) {
    console.log("Error in getMessages controller: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Send a new message
export const sendMessage = async (req, res) => {
  try {
    const { text, image } = req.body; // Extract text and image from request body
    const { id: receiverId } = req.params; // Get receiver's user ID from request parameters
    const senderId = req.user._id; // Get logged-in user's ID (sender)

    let imageUrl;
    if (image) {
      // If an image is included, upload it to Cloudinary
      const uploadResponse = await cloudinary.uploader.upload(image);
      imageUrl = uploadResponse.secure_url; // Store the secure URL of the uploaded image
    }

    // Create a new message instance
    const newMessage = new Message({
      senderId,
      receiverId,
      text,
      image: imageUrl,
    });

    await newMessage.save(); // Save the message to the database

    // Get the receiver's socket ID for real-time messaging
    const receiverSocketId = getReceiverSocketId(receiverId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", newMessage); // Emit message to receiver if online
    }

    res.status(201).json(newMessage); // Return the newly created message
  } catch (error) {
    console.log("Error in sendMessage controller: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};
