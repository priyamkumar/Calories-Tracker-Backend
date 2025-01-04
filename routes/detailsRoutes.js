const express = require("express");
const { addOrUpdateDetails, getDetails } = require("../controllers/userDetailsController");
const isAuthenticated = require("../middleware/auth");
const router = express.Router();

router.get("/userDetails",isAuthenticated, getDetails);
router.put("/addDetails",isAuthenticated, addOrUpdateDetails);

module.exports = router;