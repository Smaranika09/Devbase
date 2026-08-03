const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const authMiddleware = require("../middleware/authMiddleware");

router.get(
  "/login", 
  authController.loginPage
);
router.get(
  "/signup", 
  authController.signupPage
);
router.post(
  "/signup", 
  authController.signup
);
router.post(
  "/login", 
  authController.login
);
router.get(
  "/logout", 
  authController.logout
);
router.post(
  "/profile-setup",  
  authMiddleware.isLoggedIn,
  authController.saveProfile
);
router.get(
  "/profile-setup",
  authMiddleware.isLoggedIn,
  authController.profileSetupPage
);

module.exports = router;