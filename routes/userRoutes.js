const express = require("express");
const { registerUser, loginUser, logoutUser, getUser } = require("../controllers/userController");
const isAuthenticated = require("../middleware/auth");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/logout", isAuthenticated, logoutUser);
router.get("/getUser", isAuthenticated, getUser);


module.exports = router;