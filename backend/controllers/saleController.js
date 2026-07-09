const Sale = require("../models/Sale");
const Uniform = require("../models/Uniform");
const createSale = async (req, res) => {
  try {
    const { customerName, customerPhone, items, paymentMethod } = req.body;

    if (!customerName || !customerPhone || !items || items.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Please provide all required fields",
      });
    }

    let totalAmount = 0;

    for (const item of items) {
      const uniform = await Uniform.findById(item.uniform);

      if (!uniform) {
        return res.status(404).json({
          success: false,
          message: "Uniform not found",
        });
      }

      if (uniform.stock < item.quantity) {
        return res.status(400).json({
          success: false,
          message: `${uniform.category} has only ${uniform.stock} items left in stock`,
        });
      }

      totalAmount += uniform.price * item.quantity;

      // Reduce stock
      uniform.stock -= item.quantity;

      await uniform.save();

      // Save current price
      item.price = uniform.price;
    }

    const sale = await Sale.create({
      customerName,
      customerPhone,
      items,
      totalAmount,
      paymentMethod,
      soldBy: req.user.id,
    });

    res.status(201).json({
      success: true,
      message: "Sale created successfully",
      data: sale,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


const getAllSales = async (req, res) => {
  try {
    const sales = await Sale.find()
      .populate("soldBy", "name email")
      .populate("items.uniform", "className category price")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: sales.length,
      data: sales,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


module.exports = {
  createSale,
  getAllSales,
};