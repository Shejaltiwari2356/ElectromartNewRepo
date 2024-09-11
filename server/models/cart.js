const mongoose = require("mongoose");

// Define the schema for products in the cart
const productSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Dashboardcard", // Ensure this reference is correct
    required: true,
  },
  quantity: {
    type: Number,
    default: 1,
  },
});

// Define the schema for the cart
const CartSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Ensure this reference is correct
    required: true,
  },
  products: [productSchema], // Array of products in the cart
});

// Create the Cart model
const Cart = mongoose.model("Cart", CartSchema);

module.exports = Cart;
