const express = require("express");
const router = express.Router();

const { getDashboardStats } = require("../controllers/dashboardController");

const { protect } = require("../middleware/authMiddleware");
const { authorizeRoles } = require("../middleware/roleMiddleware");

router.get("/stats", protect, authorizeRoles("admin"), getDashboardStats);

module.exports = router;
