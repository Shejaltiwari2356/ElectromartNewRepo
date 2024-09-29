const express = require("express");
const router = express.Router();
const compareController = require("../controllers/compare-controller");
const authMiddleware = require("../middleswares/auth-middleware");

// Add a product to Compare List
router.post("/add", authMiddleware, compareController.addToCompare);

// Get the Compare List for a user (access control is handled in the controller)
router.get("/:userId", authMiddleware, compareController.getCompareList);

// Remove a product from Compare List
router.delete("/remove", authMiddleware, compareController.removeFromCompare);

// Add a product from Compare List to Cart
router.post(
  "/add-to-cart",
  authMiddleware,
  compareController.addToCartFromCompare
);

module.exports = router;
