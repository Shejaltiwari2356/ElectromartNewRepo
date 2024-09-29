const mongoose = require("mongoose");

const comparisonSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Reference to the User model
    required: true,
  },
  productIds: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product", // Reference to the Dashboardcard model
      required: true,
    },
  ],
});

const Comparison = mongoose.model("Comparison", comparisonSchema);

module.exports = Comparison;
