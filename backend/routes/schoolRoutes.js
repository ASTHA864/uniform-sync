const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const { authorizeRoles } = require("../middleware/roleMiddleware");

const {
  getSchools,
  addSchool,
  getSchoolById,
  updateSchool,
  deleteSchool,
} = require("../controllers/schoolController");

router.get("/", protect, getSchools);

router.post("/", protect, authorizeRoles("admin"), addSchool);

router.put("/:id", protect, authorizeRoles("admin"), updateSchool);

router.delete("/:id", protect, authorizeRoles("admin"), deleteSchool);



module.exports = router;
