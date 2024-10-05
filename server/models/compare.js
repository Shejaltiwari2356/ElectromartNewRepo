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
      ref: "Dashboardcard", // Reference to the Dashboardcard model (since you're storing products here)
      required: true,
    },
  ],
});

const Comparison = mongoose.model("Comparison", comparisonSchema);

module.exports = Comparison;
