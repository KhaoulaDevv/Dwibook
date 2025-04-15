import express from "express"; // Import Express framework
import {
  checkAuth, // Controller to check if user is authenticated
  login, // Controller for user login
  logout, // Controller for user logout
  signup, // Controller for user signup
  updateProfile, // Controller to update user profile
} from "../controllers/auth.controller.js";

import { protectRoute } from "../middleware/auth.middleware.js"; // Middleware to protect routes

const router = express.Router(); // Create an Express router

// Public routes (No authentication required)
router.post("/signup", signup); // Route for user registration
router.post("/login", login); // Route for user login
router.post("/logout", logout); // Route for user logout

// Protected routes (Require authentication)
router.put("/update-profile", protectRoute, updateProfile); // Route to update user profile
router.get("/check", protectRoute, checkAuth); // Route to check authentication status

export default router; // Export the router for use in the main app
