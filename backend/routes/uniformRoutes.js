const express = require("express");
const router = express.Router();

const { addUniform } = require("../controllers/uniformController");
const { protect } = require("../middleware/authMiddleware");
const { authorizeRoles } = require("../middleware/roleMiddleware");

// Only Admin can add uniforms
router.post("/", protect, authorizeRoles("admin"), addUniform);

module.exports = router;
