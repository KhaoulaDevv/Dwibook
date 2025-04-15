import express from "express"; // Import Express framework
import { protectRoute } from "../middleware/auth.middleware.js"; // Middleware to protect routes
import {
  getMessages, // Controller to fetch messages between users
  getUsersForSidebar, // Controller to get list of users for messaging
  sendMessage, // Controller to send a new message
} from "../controllers/message.controller.js";

const router = express.Router(); // Create an Express router

// Protected routes (Require authentication)
router.get("/users", protectRoute, getUsersForSidebar); // Get list of users excluding the logged-in user
router.get("/:id", protectRoute, getMessages); // Get messages between logged-in user and another user

router.post("/send/:id", protectRoute, sendMessage); // Send a new message to a specific user

export default router; // Export the router for use in the main app
