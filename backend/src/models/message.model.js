import mongoose from "mongoose"; // Import Mongoose for database interaction

// Define the schema for messages
const messageSchema = new mongoose.Schema(
  {
    senderId: {
      type: mongoose.Schema.Types.ObjectId, // Store sender's ID as a reference
      ref: "User", // Reference to the User model
      required: true, // This field is mandatory
    },
    receiverId: {
      type: mongoose.Schema.Types.ObjectId, // Store receiver's ID as a reference
      ref: "User", // Reference to the User model
      required: true, // This field is mandatory
    },
    text: {
      type: String, // Message text
    },
    image: {
      type: String, // Image URL (if an image is sent)
    },
  },
  { timestamps: true } // Automatically add createdAt and updatedAt timestamps
);

// Create and export the Message model
const Message = mongoose.model("Message", messageSchema);
export default Message;
