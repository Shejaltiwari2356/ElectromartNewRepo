import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../store/auth"; // Importing the auth hook

const Compare = () => {
  const [compareList, setCompareList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuth(); // Accessing the user from the auth context
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchCompareList();
  }, [user, token]);

  const fetchCompareList = async () => {
    if (!user) {
      setError("Please log in to view your comparison list.");
      setLoading(false);
      return;
    }

    if (!token) {
      setError("Authentication token missing. Please log in.");
      navigate("/login");
      return;
    }

    try {
      const response = await axios.get(`/api/compare/${user._id}`, {
        headers: {
          Authorization: `Bearer ${token}`, // Include token in the headers
        },
      });
      console.log("Comparison List Response:", response.data); // Debugging line
      setCompareList(Array.isArray(response.data) ? response.data : []);
    } catch (err) {
      setError(err.response?.data?.message || "Error fetching comparison list");
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = async (productId) => {
    if (!token) {
      alert("Please login to add products to cart.");
      navigate("/login");
      return;
    }

    try {
      const response = await axios.post(
        "/api/cart/add",
        { productId, quantity: 1 },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Product added to cart:", response.data);
      navigate("/cart"); // Redirect to the cart page
    } catch (error) {
      console.error("Error adding product to cart:", error);
      alert("An error occurred while adding the product to the cart.");
    }
  };

  if (loading) return <div>Loading comparison list...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h1>Comparison List</h1>
      {compareList.length === 0 ? (
        <p>No products in your comparison list.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Specification</th>
              {compareList.map((product) => (
                <th key={product._id}>{product.name}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Name</td>
              {compareList.map((product) => (
                <td key={product._id}>{product.name}</td>
              ))}
            </tr>
            <tr>
              <td>Price</td>
              {compareList.map((product) => (
                <td key={product._id}>
                  {/* Check if originalprice exists */}
                  {product.originalprice ? `$${product.originalprice}` : "N/A"}
                </td>
              ))}
            </tr>
            {/* Add more rows to display additional product specifications as needed */}
          </tbody>
        </table>
      )}

      {compareList.length > 0 && (
        <div>
          {compareList.map((product) => (
            <button
              key={product._id}
              onClick={() => handleAddToCart(product._id)}
              className="add-to-cart-btn"
            >
              Add {product.name} to Cart
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Compare;
