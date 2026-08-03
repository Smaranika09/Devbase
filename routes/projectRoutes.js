const express = require("express");
const router = express.Router();

const projectController = require("../controllers/projectController");
const authMiddleware = require("../middleware/authMiddleware");
const uploadProject = require("../middleware/uploadProject");


router.get(
	"/projects",
	authMiddleware.isLoggedIn,
	authMiddleware.profileCompleted,
	projectController.projectPage
);

router.post(
	"/projects",
	authMiddleware.isLoggedIn,
	authMiddleware.profileCompleted,
	uploadProject.single("zipFile"),
	projectController.createProject
);

router.get(
	"/projects/delete/:id",
	authMiddleware.isLoggedIn,
	authMiddleware.profileCompleted,
	projectController.deleteProject
);

module.exports = router;