const { Schema, model } = require("mongoose");

const dashboardCardSchema = new Schema({
  name: String,
  price: Number,
  description: String,
  image: String,
  category: String,
  stock: Number,
});

const Dashboardcard = new model("Dashboardcard", dashboardCardSchema);

module.exports = Dashboardcard;
