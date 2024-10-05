import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./ProductList.css"; // Remove this if you fully move to Tailwind

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:5001/api/products");
        setProducts(response.data);
        setLoading(false);
      } catch (error) {
        setError("An error occurred while fetching products.");
        setLoading(false);
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
        { productId, quantity: 1 },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.status === 200 && response.data) {
        alert("Item added to cart successfully!");
        navigate("/cart");
      } else {
        alert("Failed to add item to the cart.");
      }
    } catch (error) {
      alert("An error occurred while adding the item to the cart.");
    }
  };

  const handleAddToCompare = async (productId) => {
    try {
      const response = await axios.post(
        "http://localhost:5001/api/compare/add",
        { productId },
        { headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" } }
      );

      if (response.status === 200 && response.data) {
        alert("Item added to compare successfully!");
        navigate("/compare");
      } else {
        alert("Failed to add item to compare.");
      }
    } catch (error) {
      alert("An error occurred while adding the item to compare.");
    }
  };

  return (
    <div className="flex flex-wrap gap-6 justify-center">
      {loading && <p>Loading products...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {products.length > 0 && !loading ? (
        products.map((product) => (
          <div key={product._id} className="bg-white rounded-lg shadow-lg p-6 w-80">
            <Link to={`/products/${product._id}`} className="block text-center">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-contain mb-4"
              />
              <h2 className="text-base font-medium text-gray-800 mb-2">
                {product.name}
              </h2>
              
              <div className="flex justify-between items-center text-lg text-gray-600">
  {/* Left side: Price and discount */}
  <div className="flex items-center space-x-2">
  {/* Offer Price */}
  <span className="text-lg font-bold text-gray-800">{product.offerprice}</span>
  
  {/* Original Price and Discount */}
  <div className="flex flex-col items-start">
    <span className="line-through text-sm text-gray-400">
      {product.originalprice}
    </span>
    <span className="text-green-500 text-sm">
      {product.discount} off
    </span>
  </div>
</div>

  {/* Right side: Rating */}
  <div className="flex items-center">
    <span className="text-green-500 text-sm mr-2">Rating:</span>
    <span className="text-black text-sm">{product.rating}</span>
  </div>
</div>

            </Link>
            <div className="flex justify-between items-center mt-4">
              <button
                className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded flex-1 mr-2"
                onClick={() => handleAddToCart(product._id)}
              >
                <i className="bi bi-cart3"></i> Add to Cart
              </button>
              <button
                className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded flex-1"
                onClick={() => handleAddToCompare(product._id)}
              >
                <i className="bi bi-bag"></i> Compare
              </button>
            </div>
          </div>
        ))
      ) : (
        !loading && <p>No products available.</p>
      )}
    </div>
  );
};

export default ProductList;
