const express = require("express");
const router = express.Router();

const oppController = require("../controllers/oppController");
const authMiddleware = require("../middleware/authMiddleware");

router.get(
	"/opportunities",
	authMiddleware.isLoggedIn,
	authMiddleware.profileCompleted,
	oppController.oppPage
);

router.post(
	"/opportunities",
	authMiddleware.isLoggedIn,
	authMiddleware.profileCompleted,
	oppController.createOpportunity
);

router.get(
	"/opportunities/delete/:id",
	authMiddleware.isLoggedIn,
	authMiddleware.profileCompleted,
	oppController.deleteOpportunity
);

router.get(
	"/opportunities/bookmark/:id",
	authMiddleware.isLoggedIn,
	authMiddleware.profileCompleted,
	oppController.toggleBookmark
);

router.post(
	"/opportunities/stage/:id/:stageIndex",
	authMiddleware.isLoggedIn,
	authMiddleware.profileCompleted,
	oppController.toggleStage
);

module.exports = router;