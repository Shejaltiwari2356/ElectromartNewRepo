import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../store/auth"; // Assuming you have auth context for user details

const Payment = () => {
  const location = useLocation();
  const { grandTotal } = location.state || {};
  const { user } = useAuth(); // Get the logged-in user
  const navigate = useNavigate();

  // State to manage form input
  const [formData, setFormData] = useState({
    address: "",
    city: "",
    state: "",
    pincode: "",
    paymentMethod: "creditDebit", // Default payment method
  });

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleConfirmPayment = async () => {
    try {
      // Map payment method to match schema enum values
      const paymentMethodMapping = {
        creditDebit: "Credit/Debit Card",
        upi: "UPI",
        cod: "Cash on Delivery",
      };

      const paymentData = {
        userId: user._id, // Assuming user is logged in
        grandTotal,
        address: formData.address,
        city: formData.city,
        state: formData.state,
        pincode: formData.pincode,
        paymentMethod: paymentMethodMapping[formData.paymentMethod], // Use mapped value
      };

      // Send payment data to the backend
      const response = await axios.post(
        "http://localhost:5001/api/payment", // Replace with your backend endpoint
        paymentData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Send token in headers
          },
        }
      );

      // Handle successful payment
      if (response.status === 201) {
        alert("Payment successful!");
        navigate("/thank-you"); // Redirect to a thank-you page or anywhere after successful payment
      }
    } catch (error) {
      console.error("Error processing payment:", error);
      alert("Payment failed. Please try again.");
    }
    navigate("/thank-you");
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold mb-4">
        How would you like to pay?
      </h2>

      {/* Display Total Bill */}
      <label htmlFor="bill" className="block text-sm font-medium text-gray-700">
        Total Bill
      </label>
      <input
        type="text"
        id="bill"
        name="bill"
        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
        value={`₹${grandTotal ? grandTotal.toFixed(2) : 0}`} // Display grandTotal
        readOnly // Make the field read-only
      />

      {/* Address Fields */}
      <div className="space-y-4 mb-6">
        <div>
          <label
            htmlFor="address"
            className="block text-sm font-medium text-gray-700"
          >
            Address
          </label>
          <input
            type="text"
            id="address"
            name="address"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            placeholder="1234 Main St"
            value={formData.address}
            onChange={handleInputChange}
          />
        </div>

        <div className="flex space-x-4">
          <div className="w-1/2">
            <label
              htmlFor="city"
              className="block text-sm font-medium text-gray-700"
            >
              City
            </label>
            <input
              type="text"
              id="city"
              name="city"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              placeholder="Your City"
              value={formData.city}
              onChange={handleInputChange}
            />
          </div>

          <div className="w-1/2">
            <label
              htmlFor="state"
              className="block text-sm font-medium text-gray-700"
            >
              State
            </label>
            <input
              type="text"
              id="state"
              name="state"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              placeholder="Your State"
              value={formData.state}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="pincode"
            className="block text-sm font-medium text-gray-700"
          >
            Pin Code
          </label>
          <input
            type="text"
            id="pincode"
            name="pincode"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            placeholder="123456"
            value={formData.pincode}
            onChange={handleInputChange}
          />
        </div>
      </div>

      {/* Payment Options */}
      <div className="space-y-4">
        {/* Credit or Debit Card */}
        <div className="flex items-center">
          <input
            type="radio"
            id="creditDebit"
            name="paymentMethod"
            value="creditDebit"
            className="mr-2"
            checked={formData.paymentMethod === "creditDebit"}
            onChange={handleInputChange}
          />
          <label htmlFor="creditDebit" className="flex items-center w-full">
            <div className="w-full">
              <span className="font-semibold">Credit or Debit Card</span>
            </div>
          </label>
        </div>

        {/* UPI */}
        <div className="flex items-center">
          <input
            type="radio"
            id="upi"
            name="paymentMethod"
            value="upi"
            className="mr-2"
            checked={formData.paymentMethod === "upi"}
            onChange={handleInputChange}
          />
          <label htmlFor="upi" className="flex items-center w-full">
            <div className="w-full">
              <span className="font-semibold">UPI</span>
            </div>
          </label>
        </div>

        {/* Cash on Delivery */}
        <div className="flex items-center">
          <input
            type="radio"
            id="cod"
            name="paymentMethod"
            value="cod"
            className="mr-2"
            checked={formData.paymentMethod === "cod"}
            onChange={handleInputChange}
          />
          <label htmlFor="cod" className="flex items-center w-full">
            <div className="w-full">
              <span className="font-semibold">Cash on Delivery</span>
            </div>
          </label>
        </div>
      </div>

      {/* Confirm Payment Button */}
      <button
        className="mt-6 w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
        onClick={handleConfirmPayment}
      >
        Confirm Payment
      </button>
    </div>
  );
};

export default Payment;
