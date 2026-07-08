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


const updateUniform = async (req, res) => {
  try {
    const uniform = await Uniform.findById(req.params.id);

    if (!uniform) {
      return res.status(404).json({
        success: false,
        message: "Uniform not found",
      });
    }

    // If school is being updated, verify it exists
    if (req.body.school) {
      const schoolExists = await School.findById(req.body.school);

      if (!schoolExists) {
        return res.status(404).json({
          success: false,
          message: "School not found",
        });
      }
    }

    const updatedUniform = await Uniform.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      },
    ).populate("school", "name");

    res.status(200).json({
      success: true,
      message: "Uniform updated successfully",
      data: updatedUniform,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const deleteUniform = async (req, res) => {
  try {
    const uniform = await Uniform.findById(req.params.id);

    if (!uniform) {
      return res.status(404).json({
        success: false,
        message: "Uniform not found",
      });
    }

    await Uniform.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Uniform deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


const searchUniforms = async (req, res) => {
  try {
    const {
      className,
      category,
      gender,
      size,
      status,
      minStock,
      maxPrice,
      minPrice,
    } = req.query;

    const filter = {};

    if (className) filter.className = className;
    if (category) filter.category = category;
    if (gender) filter.gender = gender;
    if (size) filter.size = size;
    if (status) filter.status = status;

    if (minStock) {
      filter.stock = { $gte: Number(minStock) };
    }

    if (minPrice || maxPrice) {
      filter.price = {};

      if (minPrice) {
        filter.price.$gte = Number(minPrice);
      }

      if (maxPrice) {
        filter.price.$lte = Number(maxPrice);
      }
    }

    const uniforms = await Uniform.find(filter)
      .populate("school", "name")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      total: uniforms.length,
      data: uniforms,
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
  updateUniform,
  deleteUniform,
  searchUniforms
};
