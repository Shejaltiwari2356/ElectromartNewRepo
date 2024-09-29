require("dotenv").config();
const express = require("express");
const app = express();
const connectDb = require("./utils/db");
const cors = require("cors");
const errorMiddleware = require("./middleswares/error-middleware");

// Import routes
const authRoute = require("./router/auth-router");
const productRoute = require("./router/product-router");
const cartRoute = require("./router/cart-router"); // Added cart route
const compareRoute = require("./router/compare-router");
const payRoute = require("./router/payment-router");

const corsOption = {
  origin: "http://localhost:5173",
  methods: "GET, POST, PUT, DELETE, PATCH, HEAD",
  credentials: true,
};

// Middleware setup
app.use(cors(corsOption));
app.use(express.json());

// Routes setup
app.use("/api/auth", authRoute);
app.use("/api/products", productRoute);
app.use("/api/cart", cartRoute);
app.use("/api/compare", compareRoute);
app.use("/api/wishlist", cartRoute);
app.use("/api", payRoute);

// Error handling middleware
app.use(errorMiddleware);

const PORT = process.env.PORT || 5001;

connectDb().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
  });
});
