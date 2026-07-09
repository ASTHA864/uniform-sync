const School = require("../models/School");
const Uniform = require("../models/Uniform");
const Sale = require("../models/Sale");

const getDashboardStats = async (req, res) => {
  try {
    const totalSchools = await School.countDocuments();

    const totalUniforms = await Uniform.countDocuments();

    const totalSales = await Sale.countDocuments();

    const sales = await Sale.find();

    const totalRevenue = sales.reduce((sum, sale) => sum + sale.totalAmount, 0);

    res.status(200).json({
      success: true,
      data: {
        totalSchools,
        totalUniforms,
        totalSales,
        totalRevenue,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getLowStockUniforms = async (req, res) => {
  try {
    const lowStockUniforms = await Uniform.find({
      stock: { $lte: 10 },
    })
      .populate("school", "name")
      .sort({ stock: 1 });

    res.status(200).json({
      success: true,
      count: lowStockUniforms.length,
      data: lowStockUniforms,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getProfitAnalytics = async (req, res) => {
  try {
    const sales = await Sale.find().populate("items.uniform");

    let totalRevenue = 0;
    let totalCost = 0;

    sales.forEach((sale) => {
      totalRevenue += sale.totalAmount;

      sale.items.forEach((item) => {
        if (item.uniform) {
          totalCost += item.uniform.costPrice * item.quantity;
        }
      });
    });

    const totalProfit = totalRevenue - totalCost;

    res.status(200).json({
      success: true,
      data: {
        totalRevenue,
        totalCost,
        totalProfit,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
module.exports = {
  getDashboardStats,
  getLowStockUniforms,
  getProfitAnalytics,
};
