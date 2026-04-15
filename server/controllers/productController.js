const productService = require("../services/productService");
const { sendSuccess } = require("../utils/response");

const getProducts = async (req, res, next) => {
  try {
    const products = await productService.getAllProducts();
    return sendSuccess(res, products, "Products fetched successfully", 200);
  } catch (error) {
    next(error); // Sends to errorHandler.js
  }
};

const getProductDetails = async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await productService.getProductById(id);

    if (!product) {
      const error = new Error("Product not found");
      error.statusCode = 404;
      throw error;
    }

    return sendSuccess(res, product, "Product details fetched successfully", 200);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getProducts,
  getProductDetails
};