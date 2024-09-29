const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    image: { type: String, required: true },
    images: [String], // For multiple images
    brand: String,
    originalprice: String,
    offerprice: String,
    discount: String,
    rating: Number,
    ratedby: String,
    category: { type: String, required: true }, // To identify the product category (e.g., Laptop, AC, etc.)

    // Common fields across categories
    //description: String,//
    about: String,

    // Mobile specific fields
    bought: String,
    cellulartechnology: String,
    os: String,
    display: String,
    ram: String,
    rom: String,
    processorspeed: String,
    battery: String,

    // Laptop specific fields
    screenSize: String,
    hardDiskSize: String,
    cpuModel: String,
    ramMemoryInstalledSize: String,
    operatingSystem: String,
    graphicsCardDescription: String,

    // Washing Machine specific fields
    capacity: String,
    color: String,
    specialFeature: String,
    maximumRotationalSpeed: String,
    accessLocation: String,
    energyRating: String,
    warranty: String,
    spinSpeed: String,
    washPrograms: String,

    // AC specific fields

    capacityAC: String, // Adjusted to avoid conflict with Washing Machine capacity
    energy_rating: String,
    type: String,

    // TV specific fields
    size: String,
    resolution: String,
    display_type: String,
    power_consumption: String,
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema, "dashboardcards");

module.exports = Product;
