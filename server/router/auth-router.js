const express = require("express");
const router = express.Router();
const authControllers = require("../controllers/auth-controller");
const signupSchema = require("../validators/auth-validator");
const validate = require("../middleswares/validate-middleware");
const authMiddleware = require("../middleswares/auth-middleware");
const dashboard = require("../controllers/dashboardcard-controller");
const searchController = require("../controllers/search-controller"); // Assuming you have a search controller

router.route("/").get(authControllers.home);
router.route("/dashboard").get(dashboard);
router
  .route("/register")
  .post(validate(signupSchema), authControllers.register);
router.route("/login").post(authControllers.login);
router.route("/user").get(authMiddleware, authControllers.user);

// Add this route for search
router.route("/search").get(searchController.search); // Adjust according to your controller

module.exports = router;
