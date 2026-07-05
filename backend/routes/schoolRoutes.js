const express = require("express");
const router = express.Router();

const {
  getSchools,
  addSchool,
  getSchoolById,
  updateSchool,
  deleteSchool,
} = require("../controllers/schoolController");

// GET all schools
router.get("/", getSchools);

// GET school by ID
router.get("/:id", getSchoolById);

// POST school
router.post("/", addSchool);

// PUT school
router.put("/:id", updateSchool);

// DELETE school
router.delete("/:id", deleteSchool);

module.exports = router;
