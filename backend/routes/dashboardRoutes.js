const express = require("express");
const router = express.Router();

const {
  getDashboardStats,
  getLowStockUniforms,} = require("../controllers/dashboardController");

const { protect } = require("../middleware/authMiddleware");
const { authorizeRoles } = require("../middleware/roleMiddleware");

router.get("/stats", protect, authorizeRoles("admin"), getDashboardStats);
router.get("/low-stock", protect, authorizeRoles("admin"), getLowStockUniforms);

module.exports = router;
