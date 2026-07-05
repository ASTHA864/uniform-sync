const School = require("../models/School");

// GET all schools
const getSchools = async (req, res) => {
  try {
    const schools = await School.find();
    res.status(200).json(schools);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// POST new school
const addSchool = async (req, res) => {
  try {
    const school = await School.create(req.body);
    res.status(201).json(school);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get school by ID
const getSchoolById = async (req, res) => {
  try {
    const school = await School.findById(req.params.id);

    if (!school) {
      return res.status(404).json({
        message: "School not found",
      });
    }

    res.json(school);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Update school
const updateSchool = async (req, res) => {
  try {
    const school = await School.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );

    if (!school) {
      return res.status(404).json({
        message: "School not found",
      });
    }

    res.json(school);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Delete school
const deleteSchool = async (req, res) => {
  try {
    const school = await School.findByIdAndDelete(req.params.id);

    if (!school) {
      return res.status(404).json({
        message: "School not found",
      });
    }

    res.json({
      message: "School deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getSchools,
  addSchool,
  getSchoolById,
  updateSchool,
  deleteSchool,
};
