const Dashboardcard = require("../models/dashboard-card");

const dashboard = async (req, res) => {
  try {
    const response = await Dashboardcard.find();
    if (!response || response.length === 0) {
      return res.status(404).json({ msg: "No service found" });
    }
    return res.status(200).json({ msg: "Service found", data: response });
  } catch (error) {
    console.log(`Error from the server ${error}`);
    return res.status(500).json({ msg: "Server error" });
  }
};

module.exports = dashboard;
