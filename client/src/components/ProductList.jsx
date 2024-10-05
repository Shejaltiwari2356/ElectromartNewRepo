import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./ProductList.css";

const ProductList = ({ category, limit }) => {
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
        console.error("Fetch Products Error:", error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts = category
    ? products.filter((product) => product.category === category)
    : products;

  // Limit products based on the provided limit prop
  const limitedProducts = limit
    ? filteredProducts.slice(0, limit)
    : filteredProducts;

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
            Authorization: `Bearer ${token}`,
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
        { productId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Add to Compare Response:", response.data);

      if (response.status === 200 && response.data) {
        alert("Item added successfully to compare!");

        // Wait for a short time to ensure the item is added to the backend before navigation
        setTimeout(() => {
          navigate("/compare"); // Navigate after adding the product
        }, 500); // Delay to ensure the backend update is complete before navigation
      } else {
        alert("Failed to add item to compare.");
      }
    } catch (error) {
      console.error("Error adding to compare:", error.response?.data || error);
      alert("An error occurred while adding the item to compare.");
    }
  };

  return (
    <div className="product-list">
      {loading && <p>Loading products...</p>}
      {error && <p className="error-message">{error}</p>}
      {limitedProducts.length > 0 && !loading
        ? limitedProducts.map((product) => (
            <div className="product-card" key={product._id}>
              <Link to={`/products/${product._id}`} className="product-link">
                <img
                  src={product.image}
                  alt={product.name}
                  className="product-image"
                />
                <h2 className="product-name">{product.name}</h2>
                <div className="price">
                  {product.offerprice}
                  <span className="original-price">
                    {product.originalprice}
                  </span>
                  <span className="discount">{product.discount} off</span>
                </div>
              </Link>
              <button
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-2 rounded ml-[5px]"
                onClick={() => handleAddToCart(product._id)}
              >
                Add to Cart
              </button>
              <button
                className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded ml-[5px]"
                onClick={() => handleAddToCompare(product._id)}
              >
                Compare
              </button>
            </div>
          ))
        : !loading && <p>No products available.</p>}
    </div>
  );
};

export default ProductList;
