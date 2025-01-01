const express = require("express");
const { addOrUpdateDetails } = require("../controllers/userDetailsController");
const isAuthenticated = require("../middleware/auth");
const router = express.Router();

router.put("/addDetails",isAuthenticated, addOrUpdateDetails);

module.exports = router;