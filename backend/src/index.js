import express from "express"; // Import Express framework
import dotenv from "dotenv"; // Import dotenv to manage environment variables
import cookieParser from "cookie-parser"; // Middleware to parse cookies
import cors from "cors"; // Middleware to handle Cross-Origin Resource Sharing (CORS)

import path from "path"; // Import path module to work with file paths

import { connectDB } from "./lib/db.js"; // Import function to connect to the database

import authRoutes from "./routes/auth.route.js"; // Import authentication routes
import messageRoutes from "./routes/message.route.js"; // Import messaging routes
import { app, server } from "./lib/socket.js"; // Import Express app and socket server

dotenv.config(); // Load environment variables from .env file

const PORT = process.env.PORT || 5001; // Get port number from environment variables with fallback
const dirname = path.resolve(); // Resolve current directory path

// Middleware setup
app.use(express.json({ limit: "50mb" })); // Parse JSON request bodies with size limit
app.use(cookieParser()); // Enable parsing of cookies
app.use(
  cors({
    origin: "http://localhost:5173", // Allow frontend to make requests (removed trailing slash)
    credentials: true, // Enable credentials (cookies, authorization headers)
    methods: ["GET", "POST", "PUT", "DELETE"], // Explicitly allow methods
    allowedHeaders: ["Content-Type", "Authorization"], // Explicitly allow headers
  })
);

// Define API routes
app.use("/api/auth", authRoutes); // Authentication routes
app.use("/api/messages", messageRoutes); // Messaging routes

// Simple test route to verify API is working
app.get("/api/test", (req, res) => {
  res.json({ message: "API is working correctly" });
});

// Serve frontend files in production mode
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(dirname, "../frontend/dist"))); // Serve frontend build files

  app.get("*", (req, res) => {
    res.sendFile(path.join(dirname, "../frontend", "dist", "index.html")); // Handle all other routes with the frontend app
  });
}

// Error handling middleware
app.use((err, req, res, next) => {
  console.error("Server error:", err);
  res
    .status(500)
    .json({ message: "Internal Server Error", error: err.message });
});

// Handle 404 errors
app.use((req, res) => {
  res.status(404).json({ message: `Route ${req.originalUrl} not found` });
});

// Start the server
server.listen(PORT, () => {
  console.log("Server is running on PORT:" + PORT); // Log server start message
  connectDB(); // Connect to the database when server starts
});
