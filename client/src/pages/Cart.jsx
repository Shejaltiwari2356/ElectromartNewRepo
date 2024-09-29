import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../store/auth";
import { FaTrash } from "react-icons/fa";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
import { MdAdd, MdRemove } from "react-icons/md";
import "./Cart.css"; // Custom CSS for additional styling

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchCartItems = async () => {
      if (!user) {
        console.error("User is not logged in.");
        return;
      }

      try {
        setLoading(true);
        const response = await axios.get(
          `http://localhost:5001/api/cart/${user._id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setCartItems(response.data.products || []);
      } catch (error) {
        console.error("Error fetching cart items:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCartItems();
  }, [user, token]);

  const handleRemoveItem = async (productId) => {
    try {
      const response = await axios.delete(
        "http://localhost:5001/api/cart/remove",
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
        console.error("Failed to remove item from cart:", response);
      }
    } catch (error) {
      console.error("Error removing item from cart:", error);
    }
  };

  const handleQuantityChange = async (productId, newQuantity) => {
    if (newQuantity < 1) return;
    try {
      const response = await axios.put(
        "http://localhost:5001/api/cart/update",
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

  const calculateTotals = () => {
    const subtotal = cartItems.reduce((total, item) => {
      const offerprice =
        parseFloat(item.productId.offerprice.replace(/[^0-9.-]+/g, "")) || 0;
      const quantity = parseInt(item.quantity, 10);
      return total + offerprice * quantity;
    }, 0);

    const tax = subtotal * 0.18;
    const shipping = subtotal > 1000 ? 0 : 50;
    const grandTotal = subtotal + tax + shipping;

    return { subtotal, tax, shipping, grandTotal };
  };

  const { subtotal, tax, shipping, grandTotal } = calculateTotals();

  const handleCheckout = () => {
    navigate("/payment", { state: { grandTotal, cartItems } });
  };

  if (loading)
    return <p className="text-center text-lg font-semibold">Loading...</p>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-gray-800 mb-6">Shopping Cart</h1>
      <div className="flex flex-col lg:flex-row lg:space-x-6">
        <div className="flex-1 bg-white rounded-lg shadow-lg overflow-hidden">
          <h2 className="text-xl font-semibold border-b px-4 py-3 bg-gray-100">
            Cart Items
          </h2>
          {cartItems.length > 0 ? (
            <ul className="divide-y divide-gray-300">
              {cartItems.map((item) => (
                <li
                  key={item.productId._id}
                  className="flex items-center p-4 space-x-4 hover:bg-gray-50 transition"
                >
                  <img
                    src={item.productId.image}
                    alt={item.productId.name}
                    className="h-32 w-32 rounded-md object-cover border border-gray-200"
                  />
                  <div className="flex-1 flex flex-col">
                    <h3 className="text-lg font-semibold">
                      <a
                        href={item.productId.href}
                        className="text-blue-600 hover:underline"
                      >
                        {item.productId.name}
                      </a>
                    </h3>
                    <div className="mt-2 flex items-center space-x-4">
                      <span className="text-gray-600 line-through">
                        {item.productId.originalprice}
                      </span>
                      <span className="text-xl font-semibold text-gray-900">
                        {item.productId.offerprice}
                      </span>
                      <span className="text-green-600">
                        {item.productId.discount}
                      </span>
                    </div>
                    <div className="mt-4 flex items-center space-x-2">
                      <button
                        onClick={() =>
                          handleQuantityChange(
                            item.productId._id,
                            item.quantity - 1
                          )
                        }
                        className="bg-gray-200 rounded-md px-3 py-1 text-lg font-semibold text-gray-800 hover:bg-gray-300 transition"
                      >
                        <MdRemove size={20} />
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
                        className="w-16 text-center border rounded-md"
                      />
                      <button
                        onClick={() =>
                          handleQuantityChange(
                            item.productId._id,
                            item.quantity + 1
                          )
                        }
                        className="bg-gray-200 rounded-md px-3 py-1 text-lg font-semibold text-gray-800 hover:bg-gray-300 transition"
                      >
                        <MdAdd size={20} />
                      </button>
                      <button
                        onClick={() => handleRemoveItem(item.productId._id)}
                        className="ml-auto text-red-600 hover:text-red-800"
                      >
                        <FaTrash size={20} />
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-center p-6">Your cart is empty.</p>
          )}
        </div>

        {cartItems.length > 0 && (
          <div className="bg-white rounded-lg shadow-lg mt-6 lg:mt-0 lg:w-1/3">
            <h2 className="text-xl font-semibold border-b px-4 py-3 bg-gray-100">
              Order Summary
            </h2>
            <div className="px-4 py-6">
              <div className="flex justify-between text-gray-800 mb-2">
                <span>Price</span>
                <span>₹{subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-800 mb-2">
                <span>Tax (18%)</span>
                <span className="text-green-600">+ ₹{tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-800 mb-4">
                <span>Delivery Charges</span>
                <span className="text-green-600">
                  {shipping === 0 ? "Free" : `₹${shipping.toFixed(2)}`}
                </span>
              </div>
              <div className="flex justify-between text-gray-900 font-semibold border-t border-gray-200 pt-4">
                <span>Total Amount</span>
                <span>₹{grandTotal.toFixed(2)}</span>
              </div>
              <button
                onClick={handleCheckout}
                className="w-full mt-4 bg-green-600 text-white py-2 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
              >
                Proceed To Pay
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
