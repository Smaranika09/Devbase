const express = require("express");
const router = express.Router();

const journalController = require("../controllers/journalController");
const authMiddleware = require("../middleware/authMiddleware");

router.get(
	"/journal",
	authMiddleware.isLoggedIn,
	authMiddleware.profileCompleted,
	journalController.journalPage
);

router.post(
	"/journal",
	authMiddleware.isLoggedIn,
	authMiddleware.profileCompleted,
	journalController.createEntry
);

router.get(
	"/journal/delete/:id",
	authMiddleware.isLoggedIn,
	authMiddleware.profileCompleted,
	journalController.deleteEntry
);

module.exports = router;