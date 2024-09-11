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
app.use("/api/cart", cartRoute); // Added cart route

// Error handling middleware
app.use(errorMiddleware);

const PORT = process.env.PORT || 5001;

connectDb().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
  });
});
