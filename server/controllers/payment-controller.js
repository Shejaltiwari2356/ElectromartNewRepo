const Payment = require("../models/payment-model"); // Adjust path as needed

const createPayment = async (req, res) => {
  try {
    const { userId, grandTotal, address, city, state, pincode, paymentMethod } =
      req.body;

    // Validate required fields
    if (
      !userId ||
      !grandTotal ||
      !address ||
      !city ||
      !state ||
      !pincode ||
      !paymentMethod
    ) {
      return res.status(400).json({ message: "All fields are required." });
    }

    // Create a new payment document
    const newPayment = new Payment({
      userId,
      grandTotal,
      address,
      city,
      state,
      postalCode: pincode, // Adjust to match schema field
      paymentMethod,
      status: "pending", // Adjust as needed
    });

    // Save the payment to the database
    const savedPayment = await newPayment.save();

    // Respond with the saved payment details
    res.status(201).json(savedPayment);
  } catch (error) {
    console.error("Error creating payment:", error.message);
    res
      .status(500)
      .json({ message: "Failed to process payment", error: error.message });
  }
};

module.exports = { createPayment };
