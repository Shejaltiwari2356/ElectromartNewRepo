const mongoose = require("mongoose");

// Define the schema
const paymentSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    products: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Dashboardcard",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
      },
    ],
    grandTotal: {
      type: Number, // Changed from totalPrice to grandTotal
      required: true,
    },
    paymentMethod: {
      type: String,
      enum: ["Credit/Debit Card", "UPI", "Cash on Delivery"],
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    postalCode: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      default: "Placed",
    },
  },
  { timestamps: true }
);

// Create the model
const Payment = mongoose.model("Payment", paymentSchema);

module.exports = Payment;
