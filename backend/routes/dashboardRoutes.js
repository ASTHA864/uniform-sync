const express = require("express");
const router = express.Router();

const {
  getDashboardStats,
  getLowStockUniforms,
  getProfitAnalytics,
  getMonthlySalesAnalytics,} = require("../controllers/dashboardController");

const { protect } = require("../middleware/authMiddleware");
const { authorizeRoles } = require("../middleware/roleMiddleware");

router.get("/stats", protect, authorizeRoles("admin"), getDashboardStats);
router.get("/low-stock", protect, authorizeRoles("admin"), getLowStockUniforms);
router.get("/profit", protect, authorizeRoles("admin"), getProfitAnalytics);
router.get(
  "/monthly-sales",
  protect,
  authorizeRoles("admin"),
  getMonthlySalesAnalytics,
);

module.exports = router;
