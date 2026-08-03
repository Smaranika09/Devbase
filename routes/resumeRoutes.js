const express = require("express");
const router = express.Router();

const resumeController = require("../controllers/resumeController");
const uploadResume = require("../middleware/uploadResume");
const authMiddleware = require("../middleware/authMiddleware");

router.get(
	"/resumes", 
	authMiddleware.isLoggedIn, 
	resumeController.resumePage
);

router.post(
	"/resumes",
	authMiddleware.isLoggedIn,
	uploadResume.single("resumeFile"),
	resumeController.createResume
);

router.get(
	"/resumes/delete/:id",
	authMiddleware.isLoggedIn,
	resumeController.deleteResume
);

module.exports = router;