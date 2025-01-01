const express = require("express");
const { registerUser, loginUser, logoutUser } = require("../controllers/userController");
const isAuthenticated = require("../middleware/auth");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/logout", isAuthenticated, logoutUser);

module.exports = router;