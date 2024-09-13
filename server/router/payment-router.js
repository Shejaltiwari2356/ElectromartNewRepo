const express = require("express");
const router = express.Router();
const { createPayment } = require("../controllers/payment-controller"); // Adjust path as needed

// Route to create a payment
router.post("/payment", createPayment);

module.exports = router;
