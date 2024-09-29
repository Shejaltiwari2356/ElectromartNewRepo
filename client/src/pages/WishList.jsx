import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../store/auth";
import { FaTrash } from "react-icons/fa";
// import "./WishList.css";

const WishList = () => {
  const [cartItems, setCartItems] = useState([]);
  const { user } = useAuth();
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCartItems = async () => {
      if (!user) {
        console.error("User is not logged in.");
        return;
      }

      try {
        const response = await axios.get(
          `http://localhost:5001/api/wishlist/${user._id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setCartItems(response.data.products || []);
      } catch (error) {
        console.error("Error fetching wishlist items:", error);
      }
    };

    fetchCartItems();
  }, [user, token]);

  const handleRemoveItem = async (productId) => {
    try {
      const response = await axios.delete(
        "http://localhost:5001/api/wishlist/remove",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          data: { userId: user._id, productId },
        }
      );
      if (response.status === 200) {
        setCartItems((prevItems) =>
          prevItems.filter((item) => item.productId._id !== productId)
        );
      } else {
        console.error("Failed to remove item from wishlist:", response);
      }
    } catch (error) {
      console.error("Error removing item from wishlist:", error);
    }
  };

  const handleQuantityChange = async (productId, newQuantity) => {
    if (newQuantity < 1) return;
    try {
      const response = await axios.put(
        "http://localhost:5001/api/wishlist/update",
        { userId: user._id, productId, quantity: newQuantity },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        setCartItems((prevItems) =>
          prevItems.map((item) =>
            item.productId._id === productId
              ? { ...item, quantity: newQuantity }
              : item
          )
        );
      } else {
        console.error("Failed to update item quantity:", response);
      }
    } catch (error) {
      console.error("Error updating item quantity:", error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <h1 className="text-4xl font-extrabold text-gray-900 mb-12 text-center">
        <span className="text-teal-600">Your</span> Wishlist
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-12">
        {cartItems.length > 0 ? (
          cartItems.map((item) => (
            <div
              key={item.productId._id}
              className="bg-white shadow-lg rounded-lg overflow-hidden transform transition-transform hover:scale-105 hover:shadow-xl"
            >
              <div className="relative">
                <img
                  src={item.productId.image}
                  alt={item.productId.name}
                  className="w-full h-60 object-cover rounded-t-lg"
                />
                <button
                  className="absolute top-4 right-4 bg-red-600 text-white rounded-full p-3 hover:bg-red-700 transition-colors"
                  onClick={() => handleRemoveItem(item.productId._id)}
                >
                  <FaTrash size={24} />
                </button>
              </div>
              <div className="p-6 space-y-4">
                <h2 className="text-2xl font-bold text-gray-800">
                  {item.productId.name}
                </h2>
                <p className="text-xl font-semibold text-gray-700">
                  {item.productId.offerprice}
                </p>
                <div className="flex items-center space-x-6">
                  <button
                    className="bg-gray-300 text-gray-800 px-4 py-2 rounded-full hover:bg-gray-400 transition-colors"
                    onClick={() =>
                      handleQuantityChange(
                        item.productId._id,
                        item.quantity - 1
                      )
                    }
                  >
                    -
                  </button>
                  <input
                    type="number"
                    value={item.quantity}
                    onChange={(e) =>
                      handleQuantityChange(
                        item.productId._id,
                        Number(e.target.value)
                      )
                    }
                    min="1"
                    className="w-20 text-center border border-gray-300 rounded-md py-2"
                  />
                  <button
                    className="bg-gray-300 text-gray-800 px-4 py-2 rounded-full hover:bg-gray-400 transition-colors"
                    onClick={() =>
                      handleQuantityChange(
                        item.productId._id,
                        item.quantity + 1
                      )
                    }
                  >
                    +
                  </button>
                </div>
                <p className="text-sm text-gray-500">
                  <span className="font-semibold">Adjust Quantity</span>
                  {/* Click the
                  "+" or "-" to adjust the quantity. */}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-600 text-center col-span-full">
            Your wishlist is currently empty.
          </p>
        )}
      </div>
    </div>
  );
};

export default WishList;
