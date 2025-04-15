// Import the Server class from socket.io
// Socket.io enables real-time, bidirectional communication between clients and server
import { Server } from "socket.io";

// Import Node.js built-in http module
// This is needed to create an HTTP server for Socket.io to attach to
import http from "http";

// Import Express framework
// Express is used to build the REST API endpoints
import express from "express";

// Initialize Express application
const app = express();

// Create an HTTP server using the Express app
// Socket.io requires a raw HTTP server to attach to, not just the Express app
const server = http.createServer(app);

// Initialize Socket.io server and attach it to the HTTP server
// Configure CORS to allow connections only from the frontend origin

// (Cross-Origin Resource Sharing) security mechanism implemented by web browsers that controls how web pages in one domain can request resources from another domain
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173"], // Frontend development server URL
  },
});

/**
 * Utility function to get a user's socket ID based on their user ID
 * This allows sending messages directly to a specific user
 *
 * @param {string} userId - The ID of the user to find
 * @returns {string|undefined} - The socket ID if user is online, undefined otherwise
 */
export function getReceiverSocketId(userId) {
  return userSocketMap[userId];
}

// In-memory storage for mapping user IDs to their socket IDs
// This keeps track of which users are currently online
const userSocketMap = {}; // {userId: socketId}

// Listen for new socket connections
io.on("connection", (socket) => {
  // Log when a new user connects
  console.log("A user connected", socket.id);

  // Extract the user ID from the connection query parameters
  // This is sent from the client when establishing the connection
  const userId = socket.handshake.query.userId;

  // If a valid user ID was provided, store the mapping
  if (userId) userSocketMap[userId] = socket.id;

  // Broadcast the updated list of online users to all connected clients
  // This allows the UI to show who is currently online
  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  // Handle socket disconnection
  socket.on("disconnect", () => {
    // Log when a user disconnects
    console.log("A user disconnected", socket.id);

    // Remove the user from the online users map
    delete userSocketMap[userId];

    // Broadcast the updated list of online users to all clients
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

// Export the configured instances for use in other parts of the application
export { io, app, server };
