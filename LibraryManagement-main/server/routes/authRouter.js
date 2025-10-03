
const express = require("express");
const router = express.Router();

const {
  loginUser,
  registerUser,
  logoutUser,
} = require('../controllers/authController');

// JWT controller and middleware
const { loginWithJwt, protectedWithJwt } = require('../controllers/jwtAuthController');
const { ensureJwtAuth } = require('../middleware/jwtAuth');

// JWT endpoints
router.post("/jwt-login", loginWithJwt); // POST /api/auth/jwt-login
router.get("/jwt-protected", ensureJwtAuth, protectedWithJwt); // GET /api/auth/jwt-protected

// Existing endpoints
router.post("/login", (req, res) => loginUser(req, res));
router.post("/register", (req, res) => registerUser(req, res));
router.get("/logout", (req, res) => logoutUser(req, res));

module.exports = router;
