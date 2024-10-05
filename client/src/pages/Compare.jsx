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
    const fetchCompareProducts = async () => {
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
        setLoading(true);
        const response = await axios.get(
          `http://localhost:5001/api/compare/${user._id}`, // Include user ID in the request
          {
            headers: {
              Authorization: `Bearer ${token}`, // Include token in the headers
            },
          }
        );
        console.log("Comparison List Response:", response.data); // Debugging line
        setCompareList(Array.isArray(response.data) ? response.data : []);
      } catch (err) {
        setError(
          err.response?.data?.message || "Error fetching comparison list"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchCompareProducts();
  }, [user, token]); // Include user and token in dependencies

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
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
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

  const handleRemoveProduct = async (productId) => {
    try {
      // Call the API to remove the product from the comparison list, sending userId and productId in the request body
      const response = await axios.delete(
        "http://localhost:5001/api/compare/remove",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          data: { userId: user._id, productId }, // Sending data similar to handleRemoveItem function
        }
      );

      // Remove the product from the state list after a successful API call
      if (response.status === 200) {
        setCompareList((prevList) =>
          prevList.filter((product) => product._id !== productId)
        );
        console.log("Product removed from comparison list:", response.data);
      } else {
        console.error(
          "Failed to remove product from comparison list:",
          response
        );
      }
    } catch (error) {
      console.error("Error removing product from comparison list:", error);
      alert("An error occurred while removing the product.");
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
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            marginTop: "20px",
          }}
        >
          <thead style={{ backgroundColor: "#f2f2f2" }}>
            <tr>
              <th
                style={{
                  padding: "10px",
                  border: "1px solid #ddd",
                  textAlign: "left",
                }}
              >
                Specification
              </th>
              {compareList.map((product) => (
                <th
                  key={product._id}
                  style={{
                    padding: "10px",
                    border: "1px solid #ddd",
                    textAlign: "center",
                  }}
                >
                  {product.name}
                  <button
                    onClick={() => handleRemoveProduct(product._id)}
                    style={{
                      marginLeft: "10px",
                      backgroundColor: "#ff4d4d",
                      color: "white",
                      border: "none",
                      cursor: "pointer",
                      padding: "5px 10px",
                      borderRadius: "5px",
                    }}
                  >
                    Remove
                  </button>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {/* Name */}
            <tr>
              <td
                style={{
                  padding: "10px",
                  border: "1px solid #ddd",
                  textAlign: "left",
                }}
              >
                Name
              </td>
              {compareList.map((product) => (
                <td
                  key={product._id}
                  style={{
                    padding: "10px",
                    border: "1px solid #ddd",
                    textAlign: "center",
                  }}
                >
                  {product.name}
                </td>
              ))}
            </tr>
            {/* Rating */}
            <tr>
              <td
                style={{
                  padding: "10px",
                  border: "1px solid #ddd",
                  textAlign: "left",
                }}
              >
                Rating
              </td>
              {compareList.map((product) => (
                <td
                  key={product._id}
                  style={{
                    padding: "10px",
                    border: "1px solid #ddd",
                    textAlign: "center",
                  }}
                >
                  {product.rating}
                </td>
              ))}
            </tr>
            {/* Bought */}
            <tr>
              <td
                style={{
                  padding: "10px",
                  border: "1px solid #ddd",
                  textAlign: "left",
                }}
              >
                Bought
              </td>
              {compareList.map((product) => (
                <td
                  key={product._id}
                  style={{
                    padding: "10px",
                    border: "1px solid #ddd",
                    textAlign: "center",
                  }}
                >
                  {product.bought}
                </td>
              ))}
            </tr>
            {/* Offer Price */}
            <tr>
              <td
                style={{
                  padding: "10px",
                  border: "1px solid #ddd",
                  textAlign: "left",
                }}
              >
                Offer Price
              </td>
              {compareList.map((product) => (
                <td
                  key={product._id}
                  style={{
                    padding: "10px",
                    border: "1px solid #ddd",
                    textAlign: "center",
                  }}
                >
                  {product.offerprice}
                </td>
              ))}
            </tr>
            {/* Original Price */}
            <tr>
              <td
                style={{
                  padding: "10px",
                  border: "1px solid #ddd",
                  textAlign: "left",
                }}
              >
                Original Price
              </td>
              {compareList.map((product) => (
                <td
                  key={product._id}
                  style={{
                    padding: "10px",
                    border: "1px solid #ddd",
                    textAlign: "center",
                  }}
                >
                  {product.originalprice}
                </td>
              ))}
            </tr>
            {/* Brand */}
            <tr>
              <td
                style={{
                  padding: "10px",
                  border: "1px solid #ddd",
                  textAlign: "left",
                }}
              >
                Brand
              </td>
              {compareList.map((product) => (
                <td
                  key={product._id}
                  style={{
                    padding: "10px",
                    border: "1px solid #ddd",
                    textAlign: "center",
                  }}
                >
                  {product.brand}
                </td>
              ))}
            </tr>
            {/* Cellular Technology */}
            <tr>
              <td
                style={{
                  padding: "10px",
                  border: "1px solid #ddd",
                  textAlign: "left",
                }}
              >
                Cellular Technology
              </td>
              {compareList.map((product) => (
                <td
                  key={product._id}
                  style={{
                    padding: "10px",
                    border: "1px solid #ddd",
                    textAlign: "center",
                  }}
                >
                  {product.cellulartechnology}
                </td>
              ))}
            </tr>
            {/* OS */}
            <tr>
              <td
                style={{
                  padding: "10px",
                  border: "1px solid #ddd",
                  textAlign: "left",
                }}
              >
                Operating System
              </td>
              {compareList.map((product) => (
                <td
                  key={product._id}
                  style={{
                    padding: "10px",
                    border: "1px solid #ddd",
                    textAlign: "center",
                  }}
                >
                  {product.os}
                </td>
              ))}
            </tr>
            {/* Display */}
            <tr>
              <td
                style={{
                  padding: "10px",
                  border: "1px solid #ddd",
                  textAlign: "left",
                }}
              >
                Display
              </td>
              {compareList.map((product) => (
                <td
                  key={product._id}
                  style={{
                    padding: "10px",
                    border: "1px solid #ddd",
                    textAlign: "center",
                  }}
                >
                  {product.display}
                </td>
              ))}
            </tr>
            {/* RAM */}
            <tr>
              <td
                style={{
                  padding: "10px",
                  border: "1px solid #ddd",
                  textAlign: "left",
                }}
              >
                RAM
              </td>
              {compareList.map((product) => (
                <td
                  key={product._id}
                  style={{
                    padding: "10px",
                    border: "1px solid #ddd",
                    textAlign: "center",
                  }}
                >
                  {product.ram}
                </td>
              ))}
            </tr>
            {/* ROM */}
            <tr>
              <td
                style={{
                  padding: "10px",
                  border: "1px solid #ddd",
                  textAlign: "left",
                }}
              >
                ROM
              </td>
              {compareList.map((product) => (
                <td
                  key={product._id}
                  style={{
                    padding: "10px",
                    border: "1px solid #ddd",
                    textAlign: "center",
                  }}
                >
                  {product.rom}
                </td>
              ))}
            </tr>
            {/* Processor Speed */}
            <tr>
              <td
                style={{
                  padding: "10px",
                  border: "1px solid #ddd",
                  textAlign: "left",
                }}
              >
                Processor Speed
              </td>
              {compareList.map((product) => (
                <td
                  key={product._id}
                  style={{
                    padding: "10px",
                    border: "1px solid #ddd",
                    textAlign: "center",
                  }}
                >
                  {product.processorspeed}
                </td>
              ))}
            </tr>
            {/* Battery */}
            <tr>
              <td
                style={{
                  padding: "10px",
                  border: "1px solid #ddd",
                  textAlign: "left",
                }}
              >
                Battery
              </td>
              {compareList.map((product) => (
                <td
                  key={product._id}
                  style={{
                    padding: "10px",
                    border: "1px solid #ddd",
                    textAlign: "center",
                  }}
                >
                  {product.battery} mAh
                </td>
              ))}
            </tr>
            {/* Discount */}
            <tr>
              <td
                style={{
                  padding: "10px",
                  border: "1px solid #ddd",
                  textAlign: "left",
                }}
              >
                Discount
              </td>
              {compareList.map((product) => (
                <td
                  key={product._id}
                  style={{
                    padding: "10px",
                    border: "1px solid #ddd",
                    textAlign: "center",
                  }}
                >
                  {product.discount}
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      )}

      {compareList.length > 0 && (
        <div style={{ marginTop: "20px" }}>
          {compareList.map((product) => (
            <button
              key={product._id}
              onClick={() => handleAddToCart(product._id)}
              className="add-to-cart-btn"
              style={{
                margin: "5px",
                padding: "10px",
                backgroundColor: "#4CAF50",
                color: "white",
                border: "none",
                cursor: "pointer",
              }}
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
