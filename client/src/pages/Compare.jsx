import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../store/auth"; // Importing the auth hook
import MobileTable from "../components/MobileCompare"; // Import the MobileTable component
import ACTable from "../components/ACCompare"; // Import the ACTable component
import TvTable from "../components/TvCompare"; // Import the TvTable component
import WashingMachineTable from "../components/WmCompare"; // Import the WashingMachineTable component
import LaptopTable from "../components/LaptopCompare"; // Import the LaptopTable component

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

  // Filter products by category
  const mobileProducts = compareList.filter(
    (product) => product.category === "mobiles"
  );
  const acProducts = compareList.filter(
    (product) => product.category === "acs"
  );
  const tvProducts = compareList.filter(
    (product) => product.category === "tvs"
  );
  const washingMachineProducts = compareList.filter(
    (product) => product.category === "washingmachines"
  );
  const laptopProducts = compareList.filter(
    (product) => product.category === "laptops"
  );

  return (
    <div>
      <h1>Comparison List</h1>
      {mobileProducts.length > 0 && (
        <MobileTable
          compareList={mobileProducts}
          handleAddToCart={handleAddToCart}
          handleRemoveProduct={handleRemoveProduct}
        />
      )}
      {acProducts.length > 0 && (
        <ACTable
          compareList={acProducts}
          handleAddToCart={handleAddToCart}
          handleRemoveProduct={handleRemoveProduct}
        />
      )}
      {tvProducts.length > 0 && (
        <TvTable
          compareList={tvProducts}
          handleAddToCart={handleAddToCart}
          handleRemoveProduct={handleRemoveProduct}
        />
      )}
      {washingMachineProducts.length > 0 && (
        <WashingMachineTable
          compareList={washingMachineProducts}
          handleAddToCart={handleAddToCart}
          handleRemoveProduct={handleRemoveProduct}
        />
      )}
      {laptopProducts.length > 0 && (
        <LaptopTable
          compareList={laptopProducts}
          handleAddToCart={handleAddToCart}
          handleRemoveProduct={handleRemoveProduct}
        />
      )}
      {compareList.length === 0 && <p>No products in your comparison list.</p>}
    </div>
  );
};

export default Compare;
