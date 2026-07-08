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

    // Populate school details before sending response
    const populatedUniform = await Uniform.findById(uniform._id).populate(
      "school",
      "name",
    );

    res.status(201).json({
      message: "Uniform added successfully",
      uniform: populatedUniform,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getAllUniforms = async (req, res) => {
  try {
    const uniforms = await Uniform.find()
      .populate("school",  "name")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: uniforms.length,
      data: uniforms,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


const getUniformById = async (req, res) => {
  try {
    const uniform = await Uniform.findById(req.params.id).populate(
      "school",
      "name" ,
    );

    if (!uniform) {
      return res.status(404).json({
        success: false,
        message: "Uniform not found",
      });
    }

    res.status(200).json({
      success: true,
      data: uniform,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};



module.exports = {
  addUniform,
  getAllUniforms,
  getUniformById,
};
