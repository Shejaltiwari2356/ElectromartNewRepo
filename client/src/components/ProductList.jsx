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
    // if (!token) {
    //   alert("You must be logged in to add items to the cart.");
    //   return;
    // }

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

      // Check if the response is successful and contains the necessary data
      if (response.status === 200 && response.data) {
        // Optionally show a success message
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
    <div className="product-list">
      {error && <p className="error-message">{error}</p>}
      {products.map((product) => (
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
              <span className="original-price">{product.originalprice}</span>
              <span className="discount">{product.discount} off</span>
            </div>
          </Link>
          <button onClick={() => handleAddToCart(product._id)}>Buy Now</button>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
