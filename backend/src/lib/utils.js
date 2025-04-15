// Import the jsonwebtoken library
// This library is used to create and verify JSON Web Tokens (JWT)
import jwt from "jsonwebtoken";

/**
 * Generates a JWT token and sets it as an HTTP cookie
 *
 * This function creates a signed JWT containing the user's ID, sets it as a secure
 * HTTP-only cookie in the response, and returns the token. This approach is used
 * for maintaining user authentication across requests.
 *
 * @param {string} userId - The user ID to encode in the token
 * @param {Object} res - Express response object to set the cookie
 * @returns {string} - The generated JWT token
 */
export const generateToken = (userId, res) => {
  // Create a signed JWT
  // The token contains the userId in its payload and is signed with the JWT_SECRET
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "7d", // Token expires after 7 days
  });

  // Set the JWT as a cookie in the HTTP response
  res.cookie("jwt", token, {
    maxAge: 7 * 24 * 60 * 60 * 1000, // Cookie expiration in milliseconds (7 days)

    httpOnly: true, // Cookie cannot be accessed by client-side JavaScript
    // This prevents XSS (Cross-Site Scripting) attacks

    sameSite: "strict", // Cookie is only sent to the same site as the one that originated it
    // This helps prevent CSRF (Cross-Site Request Forgery) attacks

    secure: process.env.NODE_ENV !== "development", // In production: only sent over HTTPS
    // In development: can be sent over HTTP
  });

  // Return the token (can be useful if needed elsewhere)
  return token;
};
