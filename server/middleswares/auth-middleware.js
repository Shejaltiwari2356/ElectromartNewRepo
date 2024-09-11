// auth-middleware.js
const User = require("../models/user-models");
const jwt = require("jsonwebtoken");

const authMiddleware = async (req, res, next) => {
  // Extract token from Authorization header
  const token = req.header("Authorization")?.replace("Bearer ", "").trim();

  if (!token) {
    return res
      .status(401)
      .json({ message: "Unauthorized, Token not provided" });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    // Fetch user based on email or userId from token
    const userData = await User.findOne({ _id: decoded.userId }).select({
      password: 0,
    });

    if (!userData) {
      return res.status(401).json({ message: "Unauthorized, User not found" });
    }

    req.user = userData; // Attach user data to the request
    next();
  } catch (error) {
    console.error("Token verification error:", error); // Log error for debugging
    res.status(401).json({ message: "Unauthorized, Invalid token" });
  }
};

module.exports = authMiddleware;
