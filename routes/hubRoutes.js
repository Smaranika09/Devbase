const express = require("express");
const router = express.Router();

const hubController = require("../controllers/hubController");
const authMiddleware = require("../middleware/authMiddleware");

router.get(
	"/hub",
	authMiddleware.isLoggedIn,
	authMiddleware.profileCompleted,
	hubController.hubPage
);

router.post(
	"/hub",
	authMiddleware.isLoggedIn,
	authMiddleware.profileCompleted,
	hubController.createLink
);

router.get(
	"/hub/delete/:id",
	authMiddleware.isLoggedIn,
	authMiddleware.profileCompleted,
	hubController.deleteLink
);

router.get(
	"/hub/favorite/:id",
	authMiddleware.isLoggedIn,
	authMiddleware.profileCompleted,
	hubController.toggleFavorite
);

module.exports = router;