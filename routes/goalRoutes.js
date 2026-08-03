const express = require("express");
const router = express.Router();
const goalController = require("../controllers/goalController");
const authMiddleware = require("../middleware/authMiddleware");

router.get(
	"/goals",
	authMiddleware.isLoggedIn,
	authMiddleware.profileCompleted,
	goalController.goalPage
);

router.get(
	"/goals/delete/:id",
	authMiddleware.isLoggedIn,
	authMiddleware.profileCompleted,
	goalController.deleteGoal
);

router.post(
	"/goals",
	authMiddleware.isLoggedIn,
	authMiddleware.profileCompleted,
	goalController.createGoal
);

router.post(
	"/goals/update-status/:id",
	authMiddleware.isLoggedIn,
	authMiddleware.profileCompleted,
	goalController.updateStatus
);

router.post(
	"/goals/update-priority/:id",
	authMiddleware.isLoggedIn,
	authMiddleware.profileCompleted,
	goalController.updatePriority
);

module.exports = router;