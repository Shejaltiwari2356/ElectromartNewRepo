const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: String,
    image: String,
    rating: Number,
    bought: String,
    offerprice: String,
    originalprice: String,
    description: String,
    ratedby: Number,
    brand: String,
    cellulartechnology: String,
    os: String,
    display: String,
    ram: String,
    rom: String,
    processorspeed: String,
    battery: String,
    discount: String,
    about: String,
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema, "dashboardcards");

module.exports = Product;
