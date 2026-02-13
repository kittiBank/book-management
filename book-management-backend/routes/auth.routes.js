const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller");

// POST /auth/register - register user
router.post("/register", authController.register);

// POST /auth/login - login user
router.post("/login", authController.login);

module.exports = router;
