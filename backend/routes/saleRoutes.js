const express = require("express");
const router = express.Router();

const { createSale, getAllSales } = require("../controllers/saleController");

const { protect } = require("../middleware/authMiddleware");
const { authorizeRoles } = require("../middleware/roleMiddleware");

router.get("/", protect, authorizeRoles("admin"), getAllSales);
router.post("/", protect, authorizeRoles("admin"), createSale);


module.exports = router;
