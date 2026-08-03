const express = require("express");
const router = express.Router();

const dashboardController = require("../controllers/dashboardController");
const authMiddleware = require("../middleware/authMiddleware");


router.get(
	"/dashboard",
	authMiddleware.isLoggedIn,
	authMiddleware.profileCompleted,
	dashboardController.dashboardPage
);


module.exports = router;