// auth-middleware.js
const User = require("../models/user-models");
const jwt = require("jsonwebtoken");

const authMiddleware = async (req, res, next) => {
  // Extract token from Authorization header and trim
  const token = req.header("Authorization")?.replace("Bearer ", "").trim();

  if (!token) {
    return res
      .status(401)
      .json({ message: "Unauthorized, Token not provided" });
  }

  try {
    // Verify the token using JWT secret key
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    // Fetch user based on decoded userId (from the token)
    const userData = await User.findOne({ _id: decoded.userId }).select({
      password: 0, // Ensure password is not included in the user object
    });

    // If no user is found, return 401 Unauthorized
    if (!userData) {
      return res.status(401).json({ message: "Unauthorized, User not found" });
    }

    // Attach user data to request for future use
    req.user = userData;
    next(); // Proceed to next middleware or route handler
  } catch (error) {
    console.error("Token verification error:", error); // Log error for debugging

    // Check if the error is related to JWT expiration or token invalidity
    const message =
      error.name === "TokenExpiredError"
        ? "Unauthorized, Token has expired"
        : "Unauthorized, Invalid token";

    // Send appropriate response to the client
    res.status(401).json({ message });
  }
};

module.exports = authMiddleware;
