import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./ProductList.css";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true); // Add loading state
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:5001/api/products");
        setProducts(response.data);
        setLoading(false); // Stop loading once data is fetched
      } catch (error) {
        setError("An error occurred while fetching products.");
        console.error("Fetch Products Error:", error);
        setLoading(false); // Stop loading if error occurs
      }
    };

    fetchProducts();
  }, []);

  const handleAddToCart = async (productId) => {
    if (!token) {
      alert("Please login to add products to cart.");
      navigate("/login");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5001/api/cart/add",
        {
          productId,
          quantity: 1, // Default quantity
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include token in the request headers
          },
        }
      );

      console.log("Add to Cart Response:", response.data);

      if (response.status === 200 && response.data) {
        alert("Item added to cart successfully!");
        navigate("/cart");
      } else {
        alert("Failed to add item to the cart.");
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
      alert("An error occurred while adding the item to the cart.");
    }
  };

  const handleAddToCompare = async (productId) => {
    try {
      const response = await axios.post(
        "http://localhost:5001/api/compare/add",
        {
          productId: productId, // Explicitly pass productId
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include token in the request headers
            "Content-Type": "application/json", // Ensure correct content type
          },
        }
      );

      console.log("Add to Compare Response:", response.data);

      if (response.status === 200 && response.data) {
        alert("Item added successfully to compare!");
        navigate("/compare"); // Redirect to Compare page after adding to compare
      } else {
        alert("Failed to add item to compare.");
      }
    } catch (error) {
      console.error("Error adding to compare:", error.response?.data || error);
      alert("An error occurred while adding the item to compare.");
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {loading && <p>Loading products...</p>} {/* Loading message */}
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}
      {products.length > 0 && !loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div
              className="border border-gray-300 rounded-lg shadow-lg p-4 flex flex-col items-center bg-white transition-transform transform hover:scale-105"
              key={product._id}
            >
              <Link
                to={`/products/${product._id}`}
                className="flex flex-col items-center"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover mb-4 rounded-lg transition-transform duration-200 transform hover:scale-105"
                />
                <h2 className="text-lg font-semibold mb-2 text-gray-800 text-center">
                  {product.name}
                </h2>
                <div className="text-center mb-2">
                  <span className="text-xl font-bold text-cyan-600">
                    {product.offerprice}
                  </span>
                  <span className="line-through text-gray-500 ml-2">
                    {product.originalprice}
                  </span>
                  <span className="text-red-500 ml-2">
                    {product.discount} off
                  </span>
                </div>
              </Link>
              <div className="flex space-x-4">
                <button
                  className="mt-auto bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600 transition duration-300 shadow-sm"
                  onClick={() => handleAddToCart(product._id)}
                >
                  Add to Cart
                </button>
                <button
                  className="mt-auto bg-green-500 text-white py-2 px-6 rounded-lg hover:bg-green-600 transition duration-300 shadow-sm"
                  onClick={() => handleAddToCompare(product._id)}
                >
                  Compare
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        !loading && <p>No products available.</p>
      )}
    </div>
  );
};

export default ProductList;
