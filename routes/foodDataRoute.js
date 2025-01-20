const express = require("express");
const { foodData } = require("../controllers/foodDataController");
const router = express.Router();

router.get("/foodData", foodData);

module.exports = router;