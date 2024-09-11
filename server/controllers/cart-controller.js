const Cart = require("../models/cart");
const dashboardcards = require("../models/dashboard-card");

exports.addToCart = async (req, res) => {
  const { productId, quantity } = req.body;
  const userId = req.user._id;

  try {
    console.log(
      "Add to Cart - UserID:",
      userId,
      "ProductID:",
      productId,
      "Quantity:",
      quantity
    );
    if (!productId || !quantity) {
      return res
        .status(400)
        .json({ message: "ProductID and Quantity are required" });
    }

    let cart = await Cart.findOne({ userId });

    if (cart) {
      const productIndex = cart.products.findIndex(
        (p) => p.productId.toString() === productId
      );

      if (productIndex > -1) {
        cart.products[productIndex].quantity += quantity;
      } else {
        cart.products.push({ productId, quantity });
      }
    } else {
      cart = new Cart({
        userId,
        products: [{ productId, quantity }],
      });
    }

    await cart.save();
    res.status(200).json(cart);
  } catch (error) {
    console.error("Error adding to cart:", error);
    res
      .status(500)
      .json({ message: "Error adding to cart", error: error.message });
  }
};

// Get Cart
exports.getCart = async (req, res) => {
  const userId = req.params.userId; // Extract userId from URL parameters

  try {
    // Ensure that userId is valid
    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    // Fetch cart based on userId
    const cart = await Cart.findOne({ userId }).populate("products.productId");

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    // Return cart data with products
    res.status(200).json(cart);
  } catch (error) {
    console.error("Error fetching cart:", error); // Log error for debugging
    res
      .status(500)
      .json({ message: "Error fetching cart", error: error.message });
  }
};
exports.updateCartQuantity = async (req, res) => {
  const { userId, productId, quantity } = req.body;
  try {
    console.log(
      "Update Cart Quantity - UserID:",
      userId,
      "ProductID:",
      productId,
      "Quantity:",
      quantity
    );
    if (!userId || !productId || !quantity) {
      return res
        .status(400)
        .json({ message: "UserID, ProductID, and Quantity are required" });
    }

    const cart = await Cart.findOne({ userId });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    const productIndex = cart.products.findIndex(
      (p) => p.productId.toString() === productId
    );

    if (productIndex > -1) {
      cart.products[productIndex].quantity = quantity;
      await cart.save();
      res.status(200).json(cart);
    } else {
      res.status(404).json({ message: "Product not found in cart" });
    }
  } catch (error) {
    console.error("Error updating cart quantity:", error);
    res
      .status(500)
      .json({ message: "Error updating cart", error: error.message });
  }
};

exports.removeFromCart = async (req, res) => {
  const { userId, productId } = req.body;
  try {
    console.log("Remove from Cart - UserID:", userId, "ProductID:", productId);
    if (!userId || !productId) {
      return res
        .status(400)
        .json({ message: "UserID and ProductID are required" });
    }

    const cart = await Cart.findOne({ userId });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    cart.products = cart.products.filter(
      (p) => p.productId.toString() !== productId
    );

    await cart.save();
    res.status(200).json(cart);
  } catch (error) {
    console.error("Error removing item from cart:", error);
    res
      .status(500)
      .json({ message: "Error removing item from cart", error: error.message });
  }
};
