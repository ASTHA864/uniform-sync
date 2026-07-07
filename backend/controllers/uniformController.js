const Uniform = require("../models/Uniform");
const School = require("../models/School");

const addUniform = async (req, res) => {
  try {
    const {
      school,
      className,
      category,
      gender,
      size,
      color,
      price,
      costPrice,
      stock,
      image,
      status,
    } = req.body;

    // Check required fields
    if (
      !school ||
      !className ||
      !category ||
      !gender ||
      !size ||
      !color ||
      price === undefined ||
      costPrice === undefined
    ) {
      return res.status(400).json({
        message: "Please fill all required fields",
      });
    }

    // Check if school exists
    const schoolExists = await School.findById(school);

    if (!schoolExists) {
      return res.status(404).json({
        message: "School not found",
      });
    }

    // Create Uniform
    const uniform = await Uniform.create({
      school,
      className,
      category,
      gender,
      size,
      color,
      price,
      costPrice,
      stock,
      image,
      status,
    });

    res.status(201).json({
      message: "Uniform added successfully",
      uniform,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  addUniform,
};
