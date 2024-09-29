import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./ProductList.css";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const token = localStorage.getItem("token"); // Assuming token is stored in local storage

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:5001/api/products");
        setProducts(response.data);
      } catch (error) {
        setError("An error occurred while fetching products.");
        console.error("Fetch Products Error:", error);
      }
    };

    fetchProducts();
  }, []);

  const handleAddToCart = async (productId) => {
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
        navigate("/cart"); // Redirect to Cart page after adding to cart
      } else {
        alert("Failed to add item to the cart.");
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
      alert("An error occurred while adding the item to the cart.");
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div className="border border-gray-300 rounded-lg shadow-lg p-4 flex flex-col items-center bg-white transition-transform transform hover:scale-105" key={product._id}>
            <Link to={`/products/${product._id}`} className="flex flex-col items-center">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover mb-4 rounded-lg transition-transform duration-200 transform hover:scale-105"
              />
              <h2 className="text-lg font-semibold mb-2 text-gray-800 text-center">{product.name}</h2>
              <div className="text-center mb-2">
                <span className="text-xl font-bold text-cyan-600">{product.offerprice}</span>
                <span className="line-through text-gray-500 ml-2">{product.originalprice}</span>
                <span className="text-red-500 ml-2">{product.discount} off</span>
              </div>
            </Link>
            <button 
              onClick={() => handleAddToCart(product._id)}
              className="mt-auto bg-purple-200 text-gray-800 py-2 px-6 rounded-lg hover:bg-purple-300 transition duration-300 shadow-sm"
            >
              Buy Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;







