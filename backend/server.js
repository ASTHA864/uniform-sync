require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");
const schoolRoutes = require("./routes/schoolRoutes");
const authRoutes = require("./routes/authRoutes");
const uniformRoutes = require("./routes/uniformRoutes");
const saleRoutes = require("./routes/saleRoutes");
const app = express();

connectDB();

const PORT = process.env.PORT || 5000;


// middleware used to read json data
app.use(express.json());
app.use("/api/schools", schoolRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/uniforms", uniformRoutes);
app.use("/api/sales", saleRoutes);

// Home Route
app.get("/", (req, res) => {
  res.send("Welcome to UniformSync API 🚀");
});


// Uniform Route
app.get("/api/uniform", (req, res) => {
  const uniforms = [
    {
      id: 1,
      school: "ABC School",
      category: "Shirt",
      size: "30",
      price: 450,
    },
  ];
  res.json(uniforms);
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
