const { getUserItems, newItem, updateItem, deleteItem } = require("../controllers/trackingController");
const express = require("express");
const isAuthenticated = require("../middleware/auth");

const router = express.Router();

router.get("/", isAuthenticated, getUserItems);
router.post("/new", isAuthenticated, newItem);
router.put("/update", isAuthenticated, updateItem);
router.delete("/delete", isAuthenticated, deleteItem);

module.exports = router;