const Product = require("../models/Product"); // Adjust the path based on your project structure

// Function to search products based on the query
const searchProducts = async (query) => {
  try {
    // Using a regular expression to perform a case-insensitive search
    const results = await Product.find({
      $or: [
        { name: { $regex: query, $options: "i" } }, // Search by product name
        { description: { $regex: query, $options: "i" } }, // Optionally, search by product description
      ],
    });
    return results;
  } catch (error) {
    console.error("Error searching products:", error);
    throw error;
  }
};

// Exporting the search endpoint
exports.search = async (req, res) => {
  try {
    const query = req.query.q;
    if (!query) {
      return res
        .status(400)
        .json({ message: "Query parameter 'q' is required" });
    }

    const results = await searchProducts(query);
    res.json(results);
  } catch (error) {
    res.status(500).json({ message: "Error performing search" });
  }
};
