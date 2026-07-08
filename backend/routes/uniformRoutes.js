const express = require("express");
const router = express.Router();

const {
  addUniform,
  getAllUniforms,
  getUniformById,
  updateUniform,
  deleteUniform,
  searchUniforms} = require("../controllers/uniformController");
const { protect } = require("../middleware/authMiddleware");
const { authorizeRoles } = require("../middleware/roleMiddleware");

// Only Admin can add uniforms
router.post("/", protect, authorizeRoles("admin"), addUniform);
router.get("/", protect, getAllUniforms);
router.get("/search", protect, searchUniforms);
router.get("/:id", protect, getUniformById);
router.put("/:id", protect, authorizeRoles("admin"), updateUniform);
router.delete("/:id", protect, authorizeRoles("admin"), deleteUniform);

module.exports = router;
