const Product = require("../models/Product"); // Ensure this path is correct

// Function to get all products
const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find(); // Fetch all products from the MongoDB collection
    res.status(200).json(products); // Return the products as a JSON response
  } catch (error) {
    console.error("Error fetching products:", error);
    res
      .status(500)
      .json({ message: "An error occurred while fetching products." });
  }
};

// Function to get a product by ID
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id); // Find a product by ID
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(product); // Return the product as a JSON response
  } catch (error) {
    console.error("Error fetching product:", error);
    res
      .status(500)
      .json({ message: "An error occurred while fetching the product." });
  }
};

module.exports = { getAllProducts, getProductById };
