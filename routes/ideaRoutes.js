const express = require("express");
const router = express.Router();

const ideaController = require("../controllers/ideaController");
const authMiddleware = require("../middleware/authMiddleware");

router.get(
	"/ideas",
	authMiddleware.isLoggedIn,
	authMiddleware.profileCompleted,
	ideaController.ideaPage
);

router.post(
	"/ideas",
	authMiddleware.isLoggedIn,
	authMiddleware.profileCompleted,
	ideaController.createIdea
);

router.get(
	"/ideas/delete/:id",
	authMiddleware.isLoggedIn,
	authMiddleware.profileCompleted,
	ideaController.deleteIdea
);

router.get(
	"/ideas/pin/:id",
	authMiddleware.isLoggedIn,
	authMiddleware.profileCompleted,
	ideaController.togglePin
);

module.exports = router;