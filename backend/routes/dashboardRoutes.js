const express = require("express");
const router = express.Router();

const {
  getDashboardStats,
  getLowStockUniforms,
  getProfitAnalytics} = require("../controllers/dashboardController");

const { protect } = require("../middleware/authMiddleware");
const { authorizeRoles } = require("../middleware/roleMiddleware");

router.get("/stats", protect, authorizeRoles("admin"), getDashboardStats);
router.get("/low-stock", protect, authorizeRoles("admin"), getLowStockUniforms);
router.get("/profit", protect, authorizeRoles("admin"), getProfitAnalytics);

module.exports = router;
