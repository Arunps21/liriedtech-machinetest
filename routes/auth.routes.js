const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller");

// Views
router.get("/login", authController.getLoginPage);
router.get("/register", authController.getRegisterPage);
router.get("/logout", authController.logout);

// Actions (UI)
router.post("/register", authController.registerUser);
router.post("/login", authController.loginUser);

module.exports = router;
