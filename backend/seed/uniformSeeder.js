require("dotenv").config();

const mongoose = require("mongoose");
const Uniform = require("../models/Uniform");
const School = require("../models/School");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected");
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};

const categories = ["Shirt", "Pant", "Skirt", "Tie", "Blazer", "Sweater"];

const genders = ["Boys", "Girls", "Unisex"];

const colors = ["White", "Blue", "Grey", "Black", "Navy Blue", "Maroon"];

const sizes = ["28", "30", "32", "34", "36", "38", "40"];

const seedUniforms = async () => {
  try {
    await connectDB();

    // Remove old uniforms
    await Uniform.deleteMany();

    const schools = await School.find();

    if (schools.length === 0) {
      console.log("No schools found.");
      process.exit();
    }

    const uniforms = [];

    for (const school of schools) {
      for (let cls = 1; cls <= 5; cls++) {
        uniforms.push({
          school: school._id,
          className: `Class ${cls}`,
          category: categories[Math.floor(Math.random() * categories.length)],
          gender: genders[Math.floor(Math.random() * genders.length)],
          size: sizes[Math.floor(Math.random() * sizes.length)],
          color: colors[Math.floor(Math.random() * colors.length)],
          price: Math.floor(Math.random() * 1000) + 300,
          costPrice: Math.floor(Math.random() * 700) + 200,
          stock: Math.floor(Math.random() * 150) + 20,
          image: "",
          status: "Active",
        });
      }
    }

    await Uniform.insertMany(uniforms);

    console.log(`${uniforms.length} uniforms inserted successfully!`);

    process.exit();
  } catch (error) {
    console.log(error.message);
    process.exit();
  }
};

seedUniforms();
