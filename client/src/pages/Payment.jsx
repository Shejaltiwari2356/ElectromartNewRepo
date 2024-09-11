import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../store/auth";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Payment = () => {
  const location = useLocation();
  const { grandTotal } = location.state || {};
  const { user } = useAuth(); 
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    address: "",
    city: "",
    state: "",
    pincode: "",
    paymentMethod: "creditDebit",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // Real-time validation
  const validateInput = (name, value) => {
    let error = "";
    if (name === "address" && !value) error = "Address is required";
    if (name === "city" && !value) error = "City is required";
    if (name === "state" && !value) error = "State is required";
    if (name === "pincode" && (!value || value.length !== 6)) {
      error = "Valid 6-digit pin code is required";
    }
    setErrors({ ...errors, [name]: error });
  };

  // Handle form input changes with validation
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    validateInput(name, value);
  };

  // Validate all fields
  const validateForm = () => {
    const newErrors = {};
    Object.keys(formData).forEach((field) => {
      validateInput(field, formData[field]);
      if (!formData[field]) {
        newErrors[field] = `${field.charAt(0).toUpperCase() + field.slice(1)} is required`;
      }
    });
    return newErrors;
  };

  // Handle form submission
  const handleConfirmPayment = async () => {
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    try {
      const paymentMethodMapping = {
        creditDebit: "Credit/Debit Card",
        upi: "UPI",
        cod: "Cash on Delivery",
      };

      const paymentData = {
        userId: user._id,
        grandTotal,
        ...formData,
        paymentMethod: paymentMethodMapping[formData.paymentMethod],
      };

      const response = await axios.post(
        "http://localhost:5001/api/payment",
        paymentData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.status === 201) {
        toast.success("Payment successful!");
        setTimeout(() => navigate("/thank-you"), 2000);
      }
    } catch (error) {
      console.error("Error processing payment:", error);
      toast.error("Payment failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-8 bg-white shadow-lg rounded-lg">
      <ToastContainer />
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Payment Details</h2>

      {/* Total Bill */}
      <div className="mb-6">
        <label htmlFor="bill" className="block text-sm font-medium text-gray-700 mb-1">
          Total Bill
        </label>
        <input
          type="text"
          id="bill"
          name="bill"
          className="block w-full p-3 border border-gray-300 rounded-md bg-gray-100 text-gray-700"
          value={`₹${grandTotal ? grandTotal.toFixed(2) : 0}`}
          readOnly
        />
      </div>

      {/* Address Fields */}
      <div className="space-y-4 mb-6">
        <div>
          <label htmlFor="address" className="block text-sm font-medium text-gray-700">
            Address
          </label>
          <input
            type="text"
            id="address"
            name="address"
            className={`mt-1 block w-full p-3 border rounded-md ${
              errors.address ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="1234 Main St"
            value={formData.address}
            onChange={handleInputChange}
            aria-invalid={errors.address ? "true" : "false"}
          />
          {errors.address && <span className="text-red-500 text-sm">{errors.address}</span>}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="city" className="block text-sm font-medium text-gray-700">
              City
            </label>
            <input
              type="text"
              id="city"
              name="city"
              className={`mt-1 block w-full p-3 border rounded-md ${
                errors.city ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Your City"
              value={formData.city}
              onChange={handleInputChange}
              aria-invalid={errors.city ? "true" : "false"}
            />
            {errors.city && <span className="text-red-500 text-sm">{errors.city}</span>}
          </div>

          <div>
            <label htmlFor="state" className="block text-sm font-medium text-gray-700">
              State
            </label>
            <input
              type="text"
              id="state"
              name="state"
              className={`mt-1 block w-full p-3 border rounded-md ${
                errors.state ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Your State"
              value={formData.state}
              onChange={handleInputChange}
              aria-invalid={errors.state ? "true" : "false"}
            />
            {errors.state && <span className="text-red-500 text-sm">{errors.state}</span>}
          </div>
        </div>

        <div>
          <label htmlFor="pincode" className="block text-sm font-medium text-gray-700">
            Pin Code
          </label>
          <input
            type="text"
            id="pincode"
            name="pincode"
            className={`mt-1 block w-full p-3 border rounded-md ${
              errors.pincode ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="123456"
            value={formData.pincode}
            onChange={handleInputChange}
            aria-invalid={errors.pincode ? "true" : "false"}
          />
          {errors.pincode && <span className="text-red-500 text-sm">{errors.pincode}</span>}
        </div>
      </div>

      {/* Payment Options */}
      <div className="space-y-4 mb-6">
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
          <label htmlFor="creditDebit" className="text-gray-800 font-medium">
            Credit/Debit Card
          </label>
        </div>

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
          <label htmlFor="upi" className="text-gray-800 font-medium">
            UPI
          </label>
        </div>

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
          <label htmlFor="cod" className="text-gray-800 font-medium">
            Cash on Delivery
          </label>
        </div>
      </div>

      {/* Confirm Payment Button */}
      <button
        className={`w-full py-3 rounded-md text-white font-medium ${
          loading || Object.keys(errors).some((error) => !!errors[error])
            ? "bg-blue-300 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-700"
        }`}
        onClick={handleConfirmPayment}
        disabled={loading || Object.keys(errors).some((error) => !!errors[error])}
      >
        {loading ? (
          <span className="flex items-center justify-center">
            <svg
              className="animate-spin h-5 w-5 mr-2 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
              ></path>
            </svg>
            Processing...
          </span>
        ) : (
          "Confirm Payment"
        )}
      </button>
    </div>
  );
};

export default Payment;
