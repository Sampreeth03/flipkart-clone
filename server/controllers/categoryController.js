const categoryService = require("../services/categoryService");
const { sendSuccess } = require("../utils/response");

const getCategories = async (req, res, next) => {
  try {
    const categories = await categoryService.getAllCategories();
    return sendSuccess(res, categories, "Categories fetched successfully", 200);
  } catch (error) {
    next(error);
  }
};

module.exports = { getCategories };