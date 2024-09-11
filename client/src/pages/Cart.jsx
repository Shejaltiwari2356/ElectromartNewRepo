import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../store/auth";
import "./Cart.css";
import { FaTrash } from "react-icons/fa";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const token = localStorage.getItem("token"); // Retrieve token from local storage

  useEffect(() => {
    const fetchCartItems = async () => {
      if (!user) {
        console.error("User is not logged in.");
        return;
      }

      try {
        const response = await axios.get(
          `http://localhost:5001/api/cart/${user._id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`, // Include token in headers
            },
          }
        );

        // Debugging: Check the data received
        console.log("Cart items fetched:", response.data);

        setCartItems(response.data.products || []);
      } catch (error) {
        console.error("Error fetching cart items:", error);
      }
    };

    fetchCartItems();
  }, [user, token]); // Depend on user and token

  const handleRemoveItem = async (productId) => {
    try {
      const response = await axios.delete(
        "http://localhost:5001/api/cart/remove",
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include token in headers
          },
          data: { userId: user._id, productId },
        }
      );
      console.log("Remove item response:", response.data);
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
    if (newQuantity < 1) return; // Prevent setting quantity less than 1
    try {
      const response = await axios.put(
        "http://localhost:5001/api/cart/update",
        { userId: user._id, productId, quantity: newQuantity },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include token in headers
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
      const offerpriceString = item.productId.offerprice || "0"; // Fallback to "0" if offerprice is undefined
      let offerprice = parseFloat(offerpriceString.replace(/[^0-9.-]+/g, ""));

      // Check if offerprice is valid, otherwise set it to 0
      if (isNaN(offerprice)) {
        console.error(
          "Invalid offerprice detected, setting to 0:",
          offerpriceString
        );
        offerprice = 0;
      }

      const quantity = parseInt(item.quantity, 10);

      return total + offerprice * quantity;
    }, 0);

    const tax = subtotal * 0.18; // Example tax rate
    const shipping = subtotal > 1000 ? 0 : 50; // Free shipping for orders over 1000
    const grandTotal = subtotal + tax + shipping;

    console.log({ subtotal, tax, shipping, grandTotal }); // Debugging totals
    return { subtotal, tax, shipping, grandTotal };
  };

  const { subtotal, tax, shipping, grandTotal } = calculateTotals();

  if (loading) return <p>Loading...</p>;

  return (
    <div className="mx-auto max-w-7xl px-2 lg:px-0">
      <div className="mx-auto max-w-2xl py-8 lg:max-w-7xl">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Shopping Cart
        </h1>
        <form className="mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
          <section
            aria-labelledby="cart-heading"
            className="rounded-lg bg-white lg:col-span-8"
          >
            <h2 id="cart-heading" className="sr-only">
              Items in your shopping cart
            </h2>
            {cartItems.length > 0 ? (
              <ul role="list" className="divide-y divide-gray-200">
                {cartItems.map((item) => (
                  <li key={item.productId._id} className="flex py-6 sm:py-6">
                    <div className="flex-shrink-0">
                      <img
                        src={item.productId.image}
                        alt={item.productId.name}
                        className="sm:h-38 sm:w-38 h-24 w-24 rounded-md object-contain object-center"
                      />
                    </div>
                    <div className="ml-4 flex flex-1 flex-col justify-between sm:ml-6">
                      <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                        <div>
                          <div className="flex justify-between">
                            <h3 className="text-sm">
                              <a
                                href={item.productId.href}
                                className="font-semibold text-black"
                              >
                                {item.productId.name}
                              </a>
                            </h3>
                          </div>
                          <div className="mt-1 flex text-sm">
                            <p className="text-xs font-medium text-gray-500 line-through">
                              {item.productId.originalprice}
                            </p>
                            <p className="text-sm font-medium text-gray-900">
                              &nbsp;&nbsp;{item.productId.offerprice}
                            </p>
                            &nbsp;&nbsp;
                            <p className="text-sm font-medium text-green-500">
                              {item.productId.discount}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="mb-2 flex">
                      <div className="min-w-24 flex">
                        <button
                          type="button"
                          className="h-7 w-7"
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
                          className="mx-1 h-7 w-9 rounded-md border text-center"
                        />
                        <button
                          type="button"
                          onClick={() =>
                            handleQuantityChange(
                              item.productId._id,
                              item.quantity + 1
                            )
                          }
                          className="flex h-7 w-7 items-center justify-center"
                        >
                          +
                        </button>
                      </div>
                      <div className="ml-6 flex text-sm">
                        <button
                          type="button"
                          className="flex items-center space-x-1 px-2 py-1 pl-0"
                          onClick={() => handleRemoveItem(item.productId._id)}
                        >
                          <FaTrash size={12} className="text-red-500" />
                          <span className="text-xs font-medium text-red-500">
                            Remove
                          </span>
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="empty-cart-message">Your cart is empty.</p>
            )}
          </section>
          {/* Order summary */}
          {cartItems.length > 0 && (
            <section
              aria-labelledby="summary-heading"
              className="mt-16 rounded-md bg-white lg:col-span-4 lg:mt-0 lg:p-0"
            >
              <h2
                id="summary-heading"
                className="border-b border-gray-200 px-4 py-3 text-lg font-medium text-gray-900 sm:p-4"
              >
                Price Details
              </h2>
              <div>
                <dl className="space-y-1 px-2 py-4">
                  <div className="flex items-center justify-between">
                    <dt className="text-sm text-gray-800">Price </dt>
                    <dd className="text-sm font-medium text-gray-900">
                      ₹{subtotal.toFixed(2)}
                    </dd>
                  </div>
                  <div className="flex items-center justify-between pt-4">
                    <dt className="flex items-center text-sm text-gray-800">
                      <span>Tax (18%)</span>
                    </dt>
                    <dd className="text-sm font-medium text-green-700">
                      + ₹{tax.toFixed(2)}
                    </dd>
                  </div>
                  <div className="flex items-center justify-between py-4">
                    <dt className="flex text-sm text-gray-800">
                      <span>Delivery Charges</span>
                    </dt>
                    <dd className="text-sm font-medium text-green-700">Free</dd>
                  </div>
                  <div className="flex items-center justify-between border-y border-dashed py-4">
                    <dt className="text-base font-medium text-gray-900">
                      Total Amount
                    </dt>
                    <dd className="text-base font-medium text-gray-900">
                      ₹{grandTotal.toFixed(2)}
                    </dd>
                  </div>
                  <button
                    type="button"
                    className="rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-600/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
                  >
                    Proceed To Pay
                  </button>
                </dl>
              </div>
            </section>
          )}
        </form>
      </div>
    </div>
  );
};

export default Cart;
