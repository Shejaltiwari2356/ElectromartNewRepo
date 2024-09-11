const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cart-controller");
const authMiddleware = require("../middleswares/auth-middleware");

// Add to Cart
router.post("/add", authMiddleware, cartController.addToCart);

// Get Cart
router.get("/:userId", authMiddleware, cartController.getCart);

// Update Cart Quantity
router.put("/update", authMiddleware, cartController.updateCartQuantity);

// Remove from Cart
router.delete("/remove", authMiddleware, cartController.removeFromCart);

module.exports = router;
